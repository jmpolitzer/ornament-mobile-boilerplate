import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { Notifications } from 'expo';
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownHolder } from '../../helpers/notifications/dropDownHolder';
import { RootNavigator } from '../../navigation';
import { fireauth, firestore } from '../../firebase';
import { navigateFromSplash, setSignedInUser } from '../../redux/auth/actions';
import { fetchUser, handleUserUpdate } from '../../redux/users/actions';
import { registerForPushNotifications } from '../../redux/notifications/actions';

const addListener = createReduxBoundAddListener('root');

class Main extends React.Component {
  constructor() {
    super();

    this.ref = firestore.collection('users');
    this.unsubscribeAuth = null;
    this.unsubscribeUsers = null;
    this.handleNotification = this.handleNotification.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.resetUserAndGoToSignedOutState = this.resetUserAndGoToSignedOutState.bind(this);
  }

  componentWillMount() {
    this.unsubscribeAuth = fireauth.onAuthStateChanged((user) => {
      if(user) {
        if(user.emailVerified) {
          this.props.dispatch(fetchUser(user));
        } else {
          this.resetUserAndGoToSignedOutState();
        }
      } else {
        this.resetUserAndGoToSignedOutState();
      }
    });
  }

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.signedInUser && nextProps.signedInUser) {
      this.unsubscribeUsers = this.ref.doc(nextProps.signedInUser.id)
      .onSnapshot(this.handleUserUpdate);
    }
  }

  componentDidUpdate() {
    if(this.props.signedInUser && !this.props.signedInUser.notificationToken) {
      this.props.dispatch(registerForPushNotifications(this.props.signedInUser));
    }
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
    this.unsubscribeUsers();
  }

  handleNotification(notification) {
    const data = notification.data;

    if(notification.origin === 'received') {
      DropDownHolder.getDropDown().alertWithType('success', data.title, data.body);
    } else {
      console.log('app in background', notification);
    }
  }

  handleUserUpdate(doc) {
    this.props.dispatch(handleUserUpdate(doc));
  }

  resetUserAndGoToSignedOutState() {
    this.props.dispatch(setSignedInUser(null));
    this.props.dispatch(navigateFromSplash('signedOut'));
  }

  render() {
    return (
      <View style={styles.container}>
        <RootNavigator navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigation,
            addListener
          })} />
        <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
});

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    signedInUser: state.auth.signedInUser
  }
}

export default connect(
  mapStateToProps
)(Main);

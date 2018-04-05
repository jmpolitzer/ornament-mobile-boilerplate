import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { Notifications } from 'expo';
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
    console.log(notification.data);
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
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
        addListener
      })} />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    signedInUser: state.auth.signedInUser
  }
}

export default connect(
  mapStateToProps
)(Main);

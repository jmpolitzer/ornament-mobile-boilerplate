import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../../navigation';
import { fireauth } from '../../firebase';
import { navigateFromSplash, setSignedInUser } from '../../redux/auth/actions';

const addListener = createReduxBoundAddListener('root');

class Main extends React.Component {
  constructor() {
    super();

    this.unsubscribe = null;
    this.resetUserAndGoToSignedOutState = this.resetUserAndGoToSignedOutState.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = fireauth.onAuthStateChanged((user) => {
      if(user) {
        if(user.emailVerified) {
          this.props.dispatch(setSignedInUser(user));
          this.props.dispatch(navigateFromSplash('signedIn'));
        } else {
          this.resetUserAndGoToSignedOutState();
        }
      } else {
        this.resetUserAndGoToSignedOutState();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    navigation: state.navigation
  }
}

export default connect(
  mapStateToProps
)(Main);

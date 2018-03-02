import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../../navigation';
import { fireauth } from '../../firebase';
import { setSignedInUser, setSigningInOrSigningUpState } from '../../redux/auth/actions';

const addListener = createReduxBoundAddListener('root');

class Main extends React.Component {
  constructor() {
    super();

    this.unsubscribe = null;
  }

  componentWillMount() {
    this.unsubscribe = fireauth.onAuthStateChanged((user) => {
      if(user) {
        this.props.dispatch(setSignedInUser(user));
        this.props.dispatch(setSigningInOrSigningUpState(false));
      } else {
        /* TODO: Logout */
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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

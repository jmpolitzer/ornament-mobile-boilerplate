import * as Constants from './constants';
import { NavigationActions } from 'react-navigation';
import { fireauth } from '../../firebase';
import { handleFireauthError } from '../../helpers/forms';
import { SubmissionError } from 'redux-form';

export function signIn(credentials) {
  return dispatch => {
    const { email, password } = credentials;

    return fireauth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(NavigationActions.navigate({ routeName: 'Splash' }));
    }).catch((error) => {
      handleFireauthError(error);
    });

    dispatch(clearSignInForm());
  }
}

export function signUp(credentials) {
  /*
  TODO: Move firebase logout method inside dispatch
  TODO: Add success/failure actions
  TODO: Add displayName and PhotoUrl to user creation
  TODO: Add email verification, password reset, etc.
  TODO: Move signIn and signUp to one screen
  */

  return dispatch => {
    const { email, password } = credentials;

    return fireauth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(NavigationActions.navigate({ routeName: 'Splash' }));
    }).catch((error) => {
      handleFireauthError(error);
    });

    dispatch(clearSignUpForm());
  }
}

export function signOut() {
  fireauth.signOut().then((data) => {
    console.log('sign out success', data);
  }).catch((error) => {
    console.log('error signing out', error);
  });

  return dispatch => {
    /* TODO: Set up SIGN_OUT action */
    dispatch(setFireauthInit(true));
  }
}

export function setFireauthInit(bool) {
  return {
    type: Constants.SET_FIREAUTH_INIT,
    fireauthIsInit: bool
  }
}

export function setSignedInUser(signedInUser) {
  return {
    type: Constants.SET_SIGNED_IN_USER,
    signedInUser
  }
}

function clearSignInForm() {
  return {
    type: Constants.SIGN_IN
  }
}

function clearSignUpForm() {
  return {
    type: Constants.SIGN_UP
  }
}

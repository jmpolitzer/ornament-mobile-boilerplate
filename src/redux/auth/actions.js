import * as Constants from './constants';
import { NavigationActions } from 'react-navigation';
import { fireauth } from '../../firebase';
import { handleFireauthError } from '../../helpers/forms';
import { SubmissionError } from 'redux-form';

/*
TODO: Add PhotoUrl to user profile
TODO: Add email verification, password reset, etc.
TODO: Work on placing navigation to splash screen elsewhere
TODO: LogOut occasionally crashes
*/

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
  return dispatch => {
    const { name, email, password } = credentials;

    return fireauth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(NavigationActions.navigate({ routeName: 'Splash' }));

      fireauth.currentUser.updateProfile({displayName: name})
      .then((updatedUser) => {
        dispatch(onSignUpSuccess());
      });
    }).catch((error) => {
      handleFireauthError(error);
    });

    dispatch(clearSignUpForm());
  }
}

export function signOut() {
  return dispatch => {
    fireauth.signOut().then((data) => {
      dispatch(onSignOutSuccess());
    }).catch((error) => {
      dispatch(onSignOutFailure());
    });
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

export function setAuthType(authType) {
  return {
    type: Constants.SET_AUTH_TYPE,
    authType
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

function onSignUpSuccess() {
  return {
    type: Constants.SIGN_UP_SUCCESS
  }
}

function onSignOutSuccess() {
  return {
    type: Constants.SIGN_OUT_SUCCESS
  }
}

function onSignOutFailure() {
  return {
    type: Constants.SIGN_OUT_FAILURE
  }
}

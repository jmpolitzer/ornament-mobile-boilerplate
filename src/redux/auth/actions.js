import * as Constants from './constants';
import { NavigationActions } from 'react-navigation';
import { fireauth } from '../../firebase';
import { handleFireauthError } from '../../helpers/forms';
import { SubmissionError, reset } from 'redux-form';

export function signIn(credentials) {
  return dispatch => {
    const { email, password } = credentials;

    return fireauth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(NavigationActions.navigate({ routeName: 'Splash' }));

      if(!user.emailVerified) {
        dispatch(NavigationActions.navigate({ routeName: 'SignedOut' }));
        dispatch(handleUnverifiedEmail('signInForm'));
      }
    }).catch((error) => {
      handleFireauthError(error);
    });
  }
}

export function signUp(credentials) {
  return dispatch => {
    const { name, email, password } = credentials;

    return fireauth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fireauth.currentUser.updateProfile({displayName: name})
      .then(() => {
        dispatch(NavigationActions.navigate({ routeName: 'Splash' }));

        fireauth.currentUser.sendEmailVerification()
        .then(() => {
          dispatch(NavigationActions.navigate({ routeName: 'SignedOut' }));
          dispatch(handleUnverifiedEmail('signUpForm'));
        });
      });
    }).catch((error) => {
      handleFireauthError(error);
    });
  }
}

export function signOut() {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'Splash' }));

    fireauth.signOut().then((data) => {
      dispatch(onSignOutSuccess());
    }).catch((error) => {
      dispatch(onSignOutFailure());
    });
  }
}

export function handleUnverifiedEmail(form) {

  return dispatch => {
    console.log('NOTIFY USER:', 'Please verify your email and try signing in.');
    fireauth.signOut();
    dispatch(clearAuthForm(form));
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

export function navigateFromSplash(auth) {
  return {
    type: Constants.SET_NAVIGATE_FROM_SPLASH,
    navigateFromSplash: auth
  }
}

function clearAuthForm(form) {
  return dispatch => {
    dispatch(reset(form));
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

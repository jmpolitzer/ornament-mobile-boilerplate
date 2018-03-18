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
      const emailIsVerified = user.emailVerified;

      if(emailIsVerified) {
        dispatch(NavigationActions.navigate({ routeName: 'Splash' }));
      } else {
        console.log('NOTIFY USER:', 'You need to verify your email before you can sign in.');

        dispatch(clearSignInForm());
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
        fireauth.currentUser.sendEmailVerification()
        .then(() => {
          console.log('NOTIFY USER:', 'Thanks for registering! Please verify your email and try signing in.');

          dispatch(signOut());
          dispatch(clearSignUpForm());
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

import * as Constants from './constants';
import { fireauth } from '../../firebase';

export function signIn(credentials) {
  const { email, password } = credentials;

  fireauth.signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('user signed in', user);
  }).catch((error) => {
    console.log('error signing in user', error)
  });

  return dispatch => {
    dispatch(clearSignInForm());
  }
}

export function signUp(credentials) {
  /*
  TODO: Diplay Errors To User
  TODO: Confirm password match
  TODO: Implement signIn functionality
  TODO: Move firebase methods inside dispatch
  TODO: Add success/failure actions
  TODO: Add displayName and PhotoUrl to user creation
  TODO: Add email verification, password reset, etc.
  TODO: Move signIn and signUp to one screen
  */

  const { email, password } = credentials;

  fireauth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('new user signed up', user);
  })
  .catch((error) => {
    console.log('error signing up new user', error);
  });

  return dispatch => {
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

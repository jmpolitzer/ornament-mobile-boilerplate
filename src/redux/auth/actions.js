import * as Constants from './constants';
import { fireauth } from '../../firebase';

export function signIn(credentials) {
  console.log('signing in!', credentials);

  return dispatch => {
    dispatch(clearSignInForm());
  }
}

export function signUp(credentials) {
  /*
  TODO: Diplay Errors To User
  TODO: Confirm password match
  TODO: Hide password in form fields
  TODO: Implement signIn and signOut functionality
  TODO: Move firebase methods inside dispatch
  TODO: Add success/failure actions
  */

  const { email, password } = credentials;

  fireauth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('created new user!', user);
  })
  .catch((error) => {
    console.log('error creating new user', error);
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

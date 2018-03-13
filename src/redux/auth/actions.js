import * as Constants from './constants';
import { fireauth } from '../../firebase';

export function signIn(credentials) {
  console.log('signing in!', credentials);

  return dispatch => {
    dispatch(clearSignInForm());
    dispatch(setSigningInOrSigningUpState());
  }
}

export function signUp(credentials) {
  /*
  TODO: Diplay Errors To User
  TODO: Confirm password match
  TODO: Hide password in form fields
  TODO: Implement signIn and signOut functionality
  TODO: Move firebase methods inside dispatch
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
    dispatch(setSigningInOrSigningUpState(true));
  }
}

export function setSigningInOrSigningUpState(bool) {
  return {
    type: Constants.IS_SIGNING_IN_OR_SIGNING_UP,
    isSigningInOrSigningUp: bool
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

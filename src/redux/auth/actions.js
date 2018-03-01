import { fireauth } from '../../firebase';
import * as Constants from './constants';

export function verifyAuth() {
  return dispatch => {
    fireauth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(setSignedInUser(user));
        dispatch(setSigningInOrSigningUpState());
      } else {
        /* TODO: Logout */
      }
    });
  }
}

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
  TODO: Persist new user in firebase
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
    dispatch(setSigningInOrSigningUpState());
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

function setSigningInOrSigningUpState() {
  return {
    type: Constants.IS_SIGNING_IN_OR_SIGNING_UP,
    isSigningInOrSigningUp: true
  }
}

function setSignedInUser(signedInUser) {
  return {
    type: Constants.SET_SIGNED_IN_USER,
    signedInUser
  }
}

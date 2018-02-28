// import { firestore } from '../../firebase';
import * as Constants from './constants';
// const model = 'signIn';

export function signIn(credentials) {
  console.log('signing in!', credentials);

  return dispatch => {
    dispatch(clearSignInForm());
    dispatch(setSigningInOrSigningUpState());
  }
}

function clearSignInForm() {
  return {
    type: Constants.SIGN_IN
  }
}

function setSigningInOrSigningUpState() {
  return {
    type: Constants.IS_SIGNING_IN_OR_SIGNING_UP,
    isSigningInOrSigningUp: true
  }
}

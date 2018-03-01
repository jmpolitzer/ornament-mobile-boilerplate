import * as Constants from './constants';

const initialState = {
  isSigningInOrSigningUp: false,
  signedInUser: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.IS_SIGNING_IN_OR_SIGNING_UP:
      return {
        ...state,
        isSigningInOrSigningUp: !state.isSigningInOrSigningUp
      }

    case Constants.SET_SIGNED_IN_USER:
      console.log('signed in user!', action.signedInUser);
      return {
        ...state,
        signedInUser: action.signedInUser
      }

    default:
      return state;
  }
}

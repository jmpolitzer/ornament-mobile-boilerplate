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
        isSigningInOrSigningUp: action.isSigningInOrSigningUp
      }

    default:
      return state;
  }
}
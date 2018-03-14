import * as Constants from './constants';

const initialState = {
  fireauthIsInit: false,
  signedInUser: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.SET_FIREAUTH_INIT:
      return {
        ...state,
        fireauthIsInit: action.fireauthIsInit
      }

    case Constants.SET_SIGNED_IN_USER:
      return {
        ...state,
        signedInUser: action.signedInUser
      }

    default:
      return state;
  }
}

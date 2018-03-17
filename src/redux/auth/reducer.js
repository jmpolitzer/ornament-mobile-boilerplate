import * as Constants from './constants';

const initialState = {
  fireauthIsInit: false,
  signedInUser: null,
  authType: 'signIn'
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

    case Constants.SET_AUTH_TYPE:
      return {
        ...state,
        authType: action.authType
      }

    default:
      return state;
  }
}

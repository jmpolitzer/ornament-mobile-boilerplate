import * as Constants from './constants';

const initialState = {
  signedInUser: null,
  authType: 'signIn',
  navigateFromSplash: 'unspecified',
  modalIsVisible: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.TOGGLE_VERIFY_EMAIL_MODAL:
      return {
        ...state,
        modalIsVisible: !state.modalIsVisible
      }

    case Constants.SET_NAVIGATE_FROM_SPLASH:
      return {
        ...state,
        navigateFromSplash: action.navigateFromSplash
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

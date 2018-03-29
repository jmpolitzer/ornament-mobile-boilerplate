import * as Constants from './constants';

const initialState = {
  notificationToken: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        notificationToken: action.notificationToken
      }

    default:
      return state;
  }
}

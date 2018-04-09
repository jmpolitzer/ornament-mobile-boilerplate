import * as Constants from './constants';

const initialState = {
  datePickerValue: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.LOCAL_NOTIFICATION_DATEPICKER_CHANGE:
      return {
        ...state,
        datePickerValue: action.value
      }

    default:
      return state;
  }
}

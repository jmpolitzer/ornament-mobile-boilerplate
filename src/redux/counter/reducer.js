import * as Constants from './constants';

const initialState = {
  count: 0
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.INCREMENT:
      return {
        count: state.count + 1
      }

    case Constants.DECREMENT:
      return {
        count: state.count - 1
      }

    default:
      return state;
  }
}

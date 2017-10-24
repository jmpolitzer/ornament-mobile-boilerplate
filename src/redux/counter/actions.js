import * as Constants from './constants';

export function increment() {
  return dispatch => {
    setTimeout(() => {
      dispatch(incrementAfterDelay());
    }, 1000);
  };
}

function incrementAfterDelay() {
  return {
    type: Constants.INCREMENT
  }
}

export function decrement() {
  return {
    type: Constants.DECREMENT
  }
}

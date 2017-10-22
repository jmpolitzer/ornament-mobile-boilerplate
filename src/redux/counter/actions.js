import * as Constants from './constants';

export function increment() {
  return {
    type: Constants.INCREMENT
  }
}

export function decrement() {
  return {
    type: Constants.DECREMENT
  }
}

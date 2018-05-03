export function handleError(method, e) {
  console.log(method, e);
}

export function dispatchError(e) {
  const PROMISE_ERROR = 'PROMISE_ERROR';

  return {
    type: PROMISE_ERROR,
    error: e
  }
}

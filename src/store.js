import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import rootReducer from './redux/reducers';
import { firestore } from './firebase';

console.log(firestore);

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  thunk
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;

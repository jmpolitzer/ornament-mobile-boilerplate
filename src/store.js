import { createStore, applyMiddleware, compose } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';

const initialState = {};
const enhancers = [];

const navigation = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

const middleware = [
  thunk,
  navigation
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

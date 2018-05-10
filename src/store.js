import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import { mailTransform } from './redux/transforms';
import rootReducer from './redux/reducers';

const navigation = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

const middleware = [
  thunk,
  navigation
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [mailTransform],
  blacklist: ['form']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, {}, composedEnhancers);
  let persistor = persistStore(store);

  return { store, persistor };
}

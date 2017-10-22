import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recipesReducer from './recipes/reducer';
import counterReducer from './counter/reducer';

export default combineReducers({
  router: routerReducer,
  recipes: recipesReducer,
  counter: counterReducer
});

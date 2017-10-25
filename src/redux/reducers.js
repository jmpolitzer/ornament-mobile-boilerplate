import { combineReducers } from 'redux';
import navigationReducer from './navigation/reducer';
import recipesReducer from './recipes/reducer';
import counterReducer from './counter/reducer';

export default combineReducers({
  navigation: navigationReducer,
  recipes: recipesReducer,
  counter: counterReducer
});

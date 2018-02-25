import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigationReducer from './navigation/reducer';
import recipesReducer from './recipes/reducer';
import counterReducer from './counter/reducer';
import { ADD_RECIPE, UPDATE_RECIPE } from './recipes/constants';

export default combineReducers({
  form: formReducer.plugin({
    createRecipeForm: (state, action) => {
      switch(action.type) {
        case ADD_RECIPE:
          return undefined;

        default:
          return state;
      }
    },
    updateRecipeForm: (state, action) => {
      switch(action.type) {
        case UPDATE_RECIPE:
          return undefined;

        default:
          return state;
      }
    }
  }),
  navigation: navigationReducer,
  recipes: recipesReducer,
  counter: counterReducer
});

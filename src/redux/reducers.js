import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigationReducer from './navigation/reducer';
import authReducer from './auth/reducer';
import recipesReducer from './recipes/reducer';
import counterReducer from './counter/reducer';
import { ADD_RECIPE, UPDATE_RECIPE } from './recipes/constants';
import { SIGN_IN } from './auth/constants';

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
    },
    signInForm: (state, action) => {
      switch(action.type) {
        case SIGN_IN:
          return undefined;

        default:
          return state;
      }
    }
  }),
  navigation: navigationReducer,
  auth: authReducer,
  recipes: recipesReducer,
  counter: counterReducer
});

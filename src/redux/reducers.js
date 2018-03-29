import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigationReducer from './navigation/reducer';
import authReducer from './auth/reducer';
import notificationsReducer from './notifications/reducer';
import recipesReducer from './recipes/reducer';
import * as RecipeConstants from './recipes/constants';

export default combineReducers({
  form: formReducer.plugin({
    createRecipeForm: (state, action) => {
      switch(action.type) {
        case RecipeConstants.ADD_RECIPE:
          return undefined;

        default:
          return state;
      }
    },
    updateRecipeForm: (state, action) => {
      switch(action.type) {
        case RecipeConstants.UPDATE_RECIPE:
          return undefined;

        default:
          return state;
      }
    }
  }),
  navigation: navigationReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  recipes: recipesReducer
});

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigationReducer from './navigation/reducer';
import authReducer from './auth/reducer';
import notificationsReducer from './notifications/reducer';
import mailReducer from './mail/reducer';
import profileReducer from './profile/reducer';
import recipesReducer from './recipes/reducer';
import * as RecipeConstants from './recipes/constants';
import * as MailConstants from './mail/constants';

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
    },
    createContactListForm: (state, action) => {
      switch(action.type) {
        case MailConstants.ON_CREATE_LIST:
          return undefined;

        default:
          return state;
      }
    }
  }),
  navigation: navigationReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  mail: mailReducer,
  profile: profileReducer,
  recipes: recipesReducer
});

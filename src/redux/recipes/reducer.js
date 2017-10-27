import * as Constants from './constants';

const initialState = {
  recipeList: []
};

export default (state = initialState, action) => {
  switch(action.type) {

    /* TODO: Create semantic name for receiving firestore updates and differentiate between
    successful CRUD actions. */ 
    case Constants.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes
      }

    default:
      return state;
  }
}

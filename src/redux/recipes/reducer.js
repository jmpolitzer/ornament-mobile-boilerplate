import * as Constants from './constants';

const initialState = {
  recipeList: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.ADD_RECIPE:
      return {
        ...state
      }

    case Constants.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes
      }

    default:
      return state;
  }
}

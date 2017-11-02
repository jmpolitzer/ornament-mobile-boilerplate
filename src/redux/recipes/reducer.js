import * as Constants from './constants';

const initialState = {
  isFetchingRecipes: false,
  recipeList: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.IS_FETCHING_RECIPES:
      return {
        ...state,
        isFetchingRecipes: action.isFetchingRecipes
      }

    case Constants.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes,
        isFetchingRecipes: false
      }

    case Constants.FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes,
        isFetchingRecipes: false
      }

    case Constants.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes,
        isFetchingRecipes: false
      }

    case Constants.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes,
        isFetchingRecipes: false
      }

    default:
      return state;
  }
}

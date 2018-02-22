import * as Constants from './constants';

const initialState = {
  isFetchingRecipes: false,
  recipeList: [],
  recipe: null,
  activeRecipeRow: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.IS_FETCHING_RECIPES:
      return {
        ...state,
        isFetchingRecipes: action.isFetchingRecipes
      }

    case Constants.CLEAR_SELECTED_RECIPE:
      return {
        ...state,
        recipe: null
      }

    case Constants.SET_ACTIVE_RECIPE_ROW:
      return {
        ...state,
        activeRecipeRow: action.activeRecipeRow
      }

    case Constants.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: action.recipes,
        isFetchingRecipes: false
      }

    case Constants.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.recipe
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

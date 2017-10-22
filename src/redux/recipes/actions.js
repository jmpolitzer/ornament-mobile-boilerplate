import { firestore } from '../../firebase';
import * as Constants from './constants';

export function addRecipe() {
  firestore.collection('recipes').add({
    name:'Brokyo',
    country: 'Yapan'
  });

  return {
    type: Constants.ADD_RECIPE
  }
}

export function handleRecipesData(snapshot) {
  return dispatch => {
    let recipes = [];

    snapshot.forEach((doc) => {
      const recipe = doc.data();
      recipe.id = doc.id;
      recipes.push(recipe);
    });

    dispatch(addRecipeSuccess(recipes));
  }
}

function addRecipeSuccess(recipes) {
  return {
    type: Constants.ADD_RECIPE_SUCCESS,
    recipes
  }
}

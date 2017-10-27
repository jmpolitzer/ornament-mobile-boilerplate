import { firestore } from '../../firebase';
import * as Constants from './constants';

export function addRecipe(values) {
  firestore.collection('recipes').add({
    name: values.name,
    duration: values.duration
  });

  return {
    type: Constants.ADD_RECIPE
  }
}

export function handleRecipesData(snapshot) {
  return dispatch => {
    const recipes = [];

    snapshot.forEach((doc) => {
      const { name, duration } = doc.data();

      recipes.push({
        key: doc.id,
        doc,
        name,
        duration
      });
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

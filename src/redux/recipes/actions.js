import { firestore } from '../../firebase';
import * as Constants from './constants';

export function showRecipesLoading(bool) {
  return {
    type: Constants.IS_FETCHING_RECIPES,
    isFetchingRecipes: bool
  }
}

export function setActiveRecipe(recipe) {
  return {
      type: Constants.SET_ACTIVE_RECIPE,
      recipe
    }
}

export function setActiveRecipeRow(rowId) {
  return {
    type: Constants.SET_ACTIVE_RECIPE_ROW,
    activeRecipeRow: rowId
  }
}

export function clearActiveRecipe() {
  return {
    type: Constants.CLEAR_ACTIVE_RECIPE
  }
}

export function addRecipe(values) {
  firestore.collection('recipes').add({
    name: values.name,
    duration: values.duration
  });

  return {
    type: Constants.ADD_RECIPE
  }
}

export function updateRecipe(id, values) {
  console.log('ID:', id, values);

  return {
    type: Constants.UPDATE_RECIPE
  }
}

export function deleteRecipe(id) {
  firestore.collection('recipes').doc(id).delete();

  return {
    type: Constants.DELETE_RECIPE
  }
}

export function handleRecipesData(snapshot) {
  return dispatch => {
    const docLength = snapshot.docChanges.length;
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

    if(!docLength || docLength > 1) {
      dispatch(fetchRecipesSuccess(recipes));
    } else {
      snapshot.docChanges.forEach((change) => {
        switch(change.type) {
          case 'added':
            dispatch(addRecipeSuccess(recipes));
            break;
          case 'modified':
            dispatch(updateRecipeSuccess(recipes));
            break;
          case 'removed':
            dispatch(deleteRecipeSuccess(recipes));
            break;
        }
      });
    }
  }
}

function addRecipeSuccess(recipes) {
  return {
    type: Constants.ADD_RECIPE_SUCCESS,
    recipes
  }
}

function fetchRecipesSuccess(recipes) {
  return {
    type: Constants.FETCH_RECIPES_SUCCESS,
    recipes
  }
}

function updateRecipeSuccess(recipes) {
  return {
    type: Constants.UPDATE_RECIPE_SUCCESS,
    recipes
  }
}

function deleteRecipeSuccess(recipes) {
  return {
    type: Constants.DELETE_RECIPE_SUCCESS,
    recipes
  }
}

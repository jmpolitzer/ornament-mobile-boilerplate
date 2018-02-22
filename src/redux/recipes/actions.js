import { firestore } from '../../firebase';
import * as Constants from './constants';

export function showRecipesLoading(bool) {
  return {
    type: Constants.IS_FETCHING_RECIPES,
    isFetchingRecipes: bool
  }
}

export function clearSelectedRecipe() {
  return {
    type: Constants.CLEAR_SELECTED_RECIPE
  }
}

export function setActiveRecipeRow(rowId) {
  return {
    type: Constants.SET_ACTIVE_RECIPE_ROW,
    activeRecipeRow: rowId
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

export function fetchRecipe(id) {
  return dispatch => {
    firestore.collection('recipes').doc(id).get()
    .then((doc) => {
      dispatch(fetchRecipeSuccess(doc.data()));
    })
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

function fetchRecipeSuccess(recipe) {
  return {
    type: Constants.FETCH_RECIPE_SUCCESS,
    recipe
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

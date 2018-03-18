import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipes/recipe';
import UpdateRecipe from '../containers/recipes/updateRecipe';
import UpdateRecipeProp from '../containers/recipes/updateRecipeProp';

export const RecipesStack = StackNavigator({
  Recipes: {
    screen: Recipes
  },
  Recipe: {
    screen: Recipe,
    path: 'recipes/:id',
    navigationOptions: ({ navigation }) => ({
      headerRight: <Button title='Edit'
                           onPress={() => {
                             navigation.navigate('UpdateRecipe', { id: navigation.state.params.id })
                           }}/>
    })
  },
  UpdateRecipe: {
    screen: UpdateRecipe,
    path: 'recipes/:id/update'
  },
  UpdateRecipeProp: {
    screen: UpdateRecipeProp,
    path: 'recipes/:id/update/:prop'
  }
});

import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../containers/home';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipes/recipe';
import EditRecipe from '../containers/recipes/editRecipe';
import Counter from '../containers/counter';

export const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Recipes: {
    screen: Recipes
  },
  Recipe: {
    screen: Recipe,
    path: 'recipes/:id',
    navigationOptions: ({ navigation }) => ({
      headerRight: <Button title='Edit'
                           onPress={() => {
                             navigation.navigate('EditRecipe', { id: navigation.state.params.id })
                           }}/>
    })
  },
  EditRecipe: {
    screen: EditRecipe,
    path: 'recipes/:id/edit'
  },
  Counter: {
    screen: Counter
  }
});

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from '../containers/home';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipes/recipe';
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
    path: 'recipes/:id'
  },
  Counter: {
    screen: Counter
  }
});

import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from '../containers/home';
import Recipes from '../containers/recipes';
import Counter from '../containers/counter';

export const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Recipes: {
    screen: Recipes
  },
  Counter: {
    screen: Counter
  }
});

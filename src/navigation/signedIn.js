import React from 'react';
import { TabNavigator } from 'react-navigation';
// import Home from '../containers/home';
import RecipesStack from './recipesStack';
import Counter from '../containers/counter';

console.log(RecipesStack);

export const SignedIn = TabNavigator({
  // Home: {
  //   screen: Home
  // },
  Recipes: {
    screen: RecipesStack
  },
  Counter: {
    screen: Counter
  }
});

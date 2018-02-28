import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { RecipesStack } from './recipesStack';
import Counter from '../containers/counter';


export const SignedInTabs = TabNavigator({
  RecipesStack: {
    screen: RecipesStack
  },
  /* Below is a messy implementation. Only used for stubbing purposes. */ 
  CounterStack: {
    screen: StackNavigator({
      Counter: {
        screen: Counter
      }
    })
  }
});

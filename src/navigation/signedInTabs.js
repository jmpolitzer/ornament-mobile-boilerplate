import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { RecipesStack } from './recipesStack';
import Profile from '../containers/profile';


export const SignedInTabs = TabNavigator({
  RecipesStack: {
    screen: RecipesStack
  },
  ProfileStack: {
    screen: StackNavigator({
      Profile: {
        screen: Profile
      }
    })
  }
});

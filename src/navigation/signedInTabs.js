import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { RecipesStack } from './recipesStack';
import Profile from '../containers/profile';
import Notifications from '../containers/notifications';

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
  },
  NotificationsStack: {
    screen: StackNavigator({
      Notifications: {
        screen: Notifications
      }
    })
  },
});

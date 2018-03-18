import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import SplashScreen from '../containers/splash';
import { SignedInTabs } from './signedInTabs';
import { SignedOutStack } from './signedOutStack';

export const RootNavigator = SwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  SignedIn: {
    screen: SignedInTabs
  },
  SignedOut: {
    screen: SignedOutStack
  }
}, {
  headerMode: 'none',
  mode: 'modal'
});

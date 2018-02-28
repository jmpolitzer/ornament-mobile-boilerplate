import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SignedInTabs } from './signedInTabs';
import { SignedOutStack } from './signedOutStack';

export const RootNavigator = StackNavigator({
  SignedOut: {
    screen: SignedOutStack
  },
  SignedIn: {
    screen: SignedInTabs
  }
},
{
  headerMode: 'none',
  mode: 'modal'
});

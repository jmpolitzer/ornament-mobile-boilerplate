import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SignedInTabs } from './signedIn';

export const RootNavigator = StackNavigator({
  SignedIn: {
    screen: SignedInTabs
  }
},
{
  headerMode: 'none',
  mode: 'modal'
});

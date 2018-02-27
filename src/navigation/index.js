import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignedIn from './signedIn';

export const RootNavigator = StackNavigator({
  SignedIn: {
    screen: SignedIn
  }
});

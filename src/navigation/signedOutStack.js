import React from 'react';
import { StackNavigator } from 'react-navigation';
import Authenticate from '../containers/auth';

export const SignedOutStack = StackNavigator({
  Authenticate: {
    screen: Authenticate
  }
});

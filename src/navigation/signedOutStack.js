import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignIn from '../containers/auth/signIn';

export const SignedOutStack = StackNavigator({
  SignIn: {
    screen: SignIn
  }
});

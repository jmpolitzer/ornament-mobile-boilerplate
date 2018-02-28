import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignIn from '../containers/auth/signIn';
import SignUp from '../containers/auth/signUp';

export const SignedOutStack = StackNavigator({
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  }
});

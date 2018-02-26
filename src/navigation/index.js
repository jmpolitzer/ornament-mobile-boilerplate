import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from '../auth/signIn';
import SignUp from '../auth/signUp';
import SignedOut from '../auth/signedOut';
import Home from '../containers/home';
import Recipes from '../containers/recipes';
import Recipe from '../containers/recipes/recipe';
import UpdateRecipe from '../containers/recipes/updateRecipe';
import UpdateRecipeProp from '../containers/recipes/updateRecipeProp';
import Counter from '../containers/counter';

export const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Recipes: {
    screen: Recipes
  },
  Recipe: {
    screen: Recipe,
    path: 'recipes/:id',
    navigationOptions: ({ navigation }) => ({
      headerRight: <Button title='Edit'
                           onPress={() => {
                             navigation.navigate('UpdateRecipe', { id: navigation.state.params.id })
                           }}/>
    })
  },
  UpdateRecipe: {
    screen: UpdateRecipe,
    path: 'recipes/:id/update'
  },
  UpdateRecipeProp: {
    screen: UpdateRecipeProp,
    path: 'recipes/:id/update/:prop'
  },
  Counter: {
    screen: Counter
  }
});

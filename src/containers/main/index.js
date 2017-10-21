import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Route } from 'react-router-native';
import Home from '../home';
import Counter from '../counter';

export default class Main extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class ListContacts extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <View style={styles.container}>
        <Button title='Add Contact' onPress={this.props.launchDeviceContacts} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
});

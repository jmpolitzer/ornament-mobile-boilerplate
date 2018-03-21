import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

export default class SwitchAuthTypeButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}
             backdropColor={'white'}
             backdropOpacity={1}
             onModalShow={this.props.redirect}>
        <View style={styles.modal}>
          <Text>Please verify your email first and then try signing in.</Text>
          <Button title='OK' onPress={() => this.props.toggle()} />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center'
  }
});

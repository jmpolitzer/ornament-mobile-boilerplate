import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

export default class SwitchAuthTypeButton extends React.Component {
  constructor() {
    super();

    this.getModalLanguage = this.getModalLanguage.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    /*
      Since we redirect and change the authType onModalShow, we need to ignore the state
      change when the current and next isVisible prop is true. This way, we can display
      the correct modal message.
    */ 
    return (this.props.isVisible && nextProps.isVisible) ? false : true;
  }

  getModalLanguage() {
    const modalLanguage = {
      signIn: 'Please verify your email first and then try signing in.',
      signUp: 'Thank you for registering. Please check your inbox to verify your email.',
      resetPassword: 'Please check your inbox for instructions on how to change your password.'
    };

    return modalLanguage[this.props.authType];
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}
             backdropColor={'white'}
             backdropOpacity={1}
             onModalShow={this.props.redirect}>
        <View style={styles.modal}>
          <Text>{this.getModalLanguage()}</Text>
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

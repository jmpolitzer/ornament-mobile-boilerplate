import React from 'react';
import { Button } from 'react-native-elements';

export default class PasswordResetButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button color='blue'
              backgroundColor='transparent'
              title='Forgot your password?'
              onPress={() => this.props.reset()}/>
    )
  }
}

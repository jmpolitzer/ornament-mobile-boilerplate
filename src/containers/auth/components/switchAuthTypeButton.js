import React from 'react';
import { Button } from 'react-native-elements';

export default class SwitchAuthTypeButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button
        color='blue'
        backgroundColor='transparent'
        title={this.props.authType ? 'Sign Up' : 'Sign In'}
        onPress={() => this.props.switch(this.props.authType)} />
    )
  }
}

import React from 'react';
import { Button } from 'react-native-elements';

export default class SwitchAuthTypeButton extends React.Component {
  constructor() {
    super();

    this.getTitle = this.getTitle.bind(this);
  }

  getTitle() {
    const titles = {
      signIn: 'Sign Up',
      signUp: 'Sign In',
      resetPassword: 'Sign In'
    }

    return titles[this.props.authType];
  }

  render() {
    return (
      <Button
        color='blue'
        backgroundColor='transparent'
        title={this.getTitle()}
        onPress={() => this.props.switch(this.props.authType === 'signIn' ? 'signUp' : 'signIn')} />
    )
  }
}

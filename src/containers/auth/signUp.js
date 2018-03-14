import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../../redux/auth/actions';
import SignUpForm from './signUpForm';

class SignUp extends React.Component {
  constructor() {
    super();

    this.signUp = this.signUp.bind(this);
  }

  signUp(values) {
    this.props.navigation.navigate('Splash');
    this.props.signUp(values);
  }

  render() {
    return(
      <View style={styles.container}>
        <SignUpForm onSubmit={this.signUp} />
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

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignUp);

import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../redux/auth/actions';
import SignInForm from './signInForm';

class SignIn extends React.Component {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
  }

  signIn(values) {
    this.props.signIn(values);
  }

  render() {
    return(
      <View style={styles.container}>
        {this.props.isSigningInOrSigningUp ? <ActivityIndicator />
                                           : <SignInForm onSubmit={this.signIn} />}
        <Button
          backgroundColor="transparent"
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')} />
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

const mapStateToProps = state => {
  return {
    isSigningInOrSigningUp: state.auth.isSigningInOrSigningUp
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

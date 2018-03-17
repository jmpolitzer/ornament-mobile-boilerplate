import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import { signIn, signUp, setAuthType } from '../../redux/auth/actions';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import { validateAuthForm } from '../../helpers/forms';
import R from 'ramda';

class Authenticate extends React.Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(values, dispatch, props) {
    const fields = Object.keys(props.registeredFields);
    const errors = validateAuthForm(fields, values);

    if(!R.isEmpty(errors)) {
      throw new SubmissionError(errors);
    } else {
      return this.props[this.props.authType](values)
      .catch((error) => {
        throw new SubmissionError(error.errors);
      });
    }
  }

  render() {
    const isSignIn = this.props.authType === 'signIn';

    return(
      <View style={styles.container}>
        {isSignIn ?
          <SignInForm onSubmit={this.authenticate} /> :
          <SignUpForm onSubmit={this.authenticate} />}
        <Button
          backgroundColor="transparent"
          title={isSignIn ? 'Sign Up' : 'Sign In'}
          onPress={() => this.props.setAuthType(isSignIn ? 'signUp' : 'signIn')} />
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
    authType: state.auth.authType
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn,
  signUp,
  setAuthType
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate);

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import Modal from 'react-native-modal';
import { signIn, signUp, setAuthType, toggleVerifyEmailModal } from '../../redux/auth/actions';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import { validateAuthForm } from '../../helpers/forms';
import R from 'ramda';

class Authenticate extends React.Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.toggleVerifyEmailModal = this.toggleVerifyEmailModal.bind(this);
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

  toggleVerifyEmailModal() {
    this.props.toggleVerifyEmailModal()
  }

  render() {
    console.log(this.props.modalIsVisible);
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
        <Modal isVisible={this.props.modalIsVisible}>
          <View>
            <Text>
              'Please verify your email first and then try signing in.'
            </Text>
            <Button title='OK' onPress={() => this.toggleVerifyEmailModal()} />
          </View>
        </Modal>
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
    authType: state.auth.authType,
    modalIsVisible: state.auth.modalIsVisible
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn,
  signUp,
  setAuthType,
  toggleVerifyEmailModal
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate);

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import R from 'ramda';
import { signIn, signUp, setAuthType, toggleVerifyEmailModal } from '../../redux/auth/actions';
import { validateAuthForm } from '../../helpers/forms';
import SignInForm from './forms/signInForm';
import SignUpForm from './forms/signUpForm';
import PasswordResetButton from './components/passwordResetButton';
import SwitchAuthTypeButton from './components/switchAuthTypeButton';
import VerifyEmailNoticeModal from './components/verifyEmailNoticeModal';

class Authenticate extends React.Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.toggleVerifyEmailModal = this.toggleVerifyEmailModal.bind(this);
    this.redirectToSignIn = this.redirectToSignIn.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
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

  redirectToSignIn() {
    this.props.authType !== 'signIn' && this.props.setAuthType('signIn');
  }

  resetPassword(email) {
    console.log('resetting password for', email);
  }

  render() {
    const isSignIn = this.props.authType === 'signIn';

    return(
      <View style={styles.container}>
        {isSignIn ?
          <SignInForm onSubmit={this.authenticate} /> :
          <SignUpForm onSubmit={this.authenticate} />}
        {isSignIn && <PasswordResetButton reset={this.resetPassword} />}
        <SwitchAuthTypeButton switch={this.props.setAuthType} authType={isSignIn ? 'signUp' : 'signIn'} />
        <VerifyEmailNoticeModal isVisible={this.props.modalIsVisible}
                                redirect={this.redirectToSignIn}
                                toggle={this.toggleVerifyEmailModal} />
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

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';
import R from 'ramda';
import { signIn, signUp, resetPassword, setAuthType, toggleAuthModal } from '../../redux/auth/actions';
import { validateAuthForm } from '../../helpers/forms';
import SignInForm from './forms/signInForm';
import SignUpForm from './forms/signUpForm';
import ResetPasswordRequestForm from './forms/passwordResetRequestForm';
import PasswordResetButton from './components/passwordResetButton';
import SwitchAuthTypeButton from './components/switchAuthTypeButton';
import AuthModal from './components/authModal';

class Authenticate extends React.Component {
  constructor() {
    super();

    this.authenticateOrResetPassword = this.authenticateOrResetPassword.bind(this);
    this.renderAuthForm = this.renderAuthForm.bind(this);
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
    this.redirectToSignIn = this.redirectToSignIn.bind(this);
    this.showResetPasswordForm = this.showResetPasswordForm.bind(this);
  }

  authenticateOrResetPassword(values, dispatch, props) {
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

  renderAuthForm(authType) {
    const authForms = {
      signIn: <SignInForm onSubmit={this.authenticateOrResetPassword} />,
      signUp: <SignUpForm onSubmit={this.authenticateOrResetPassword} />,
      resetPassword: <ResetPasswordRequestForm onSubmit={this.authenticateOrResetPassword} />
    }

    return authForms[authType];
  }

  toggleAuthModal() {
    this.props.toggleAuthModal()
  }

  redirectToSignIn() {
    this.props.authType !== 'signIn' && this.props.setAuthType('signIn');
  }

  showResetPasswordForm() {
    this.props.setAuthType('resetPassword');
  }

  render() {
    return(
      <View style={styles.container}>
        {this.renderAuthForm(this.props.authType)}
        {this.props.authType === 'signIn' && <PasswordResetButton reset={this.showResetPasswordForm} />}
        <SwitchAuthTypeButton switch={this.props.setAuthType} authType={this.props.authType} />
        <AuthModal isVisible={this.props.modalIsVisible}
                   authType={this.props.authType}
                   redirect={this.redirectToSignIn}
                   toggle={this.toggleAuthModal} />
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
  resetPassword,
  setAuthType,
  toggleAuthModal
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate);

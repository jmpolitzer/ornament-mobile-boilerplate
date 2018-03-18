import React from 'react';
import { View } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import { SubmissionError } from 'redux-form';
import R from 'ramda';

export const ReduxedFormInput = props => {
  const { input, type, meta: { touched, error }, ...inputProps } = props;

  /* TODO: Mapping the redux-form input.onBlur to the react-native element
  interferes with blowing away the form state in the formReducer. */
  return (
    <View>
      <FormInput {...inputProps}
                 onChangeText={input.onChange}
                 onFocus={input.onFocus}
                 value={input.value}
                 secureTextEntry={type === 'password' ? true : false} />
      {touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
    </View>
  );
}

export const validateAuthForm = (fields, values) => {
  const errors = {};
  const isSignUpForm = (fieldNames) => {
    return R.contains('password', fieldNames) && R.contains('confirmPassword', fieldNames);
  }

  fields.forEach((field) => {
    if(!values[field]) {
      errors[field] = 'Required';
    }

    if(isSignUpForm(fields) && field === 'confirmPassword') {
      const passwordVal = values['password'];
      const confirmPasswordVal = values['confirmPassword'];

      if((passwordVal && confirmPasswordVal) && (passwordVal !== confirmPasswordVal)) {
        errors['confirmPassword'] = 'Passwords must match'
      }
    }
  });

  return errors;
}

export const handleFireauthError = error => {
  switch(error.code) {
    case 'auth/invalid-email':
      throw new SubmissionError({ email: error.message });
      break;

    case 'auth/user-not-found':
      throw new SubmissionError({ email: error.message });
      break;

    case 'auth/email-already-in-use':
      throw new SubmissionError({ email: error.message });
      break;

    case 'auth/weak-password':
      throw new SubmissionError({ password: error.message, confirmPassword: error.message });
      break;

    case 'auth/wrong-password':
      throw new SubmissionError({ password: error.message });
      break;

    default:
      return;
  }

}

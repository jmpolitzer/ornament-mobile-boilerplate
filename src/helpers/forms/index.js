import React from 'react';
import { View } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

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

  fields.forEach((field) => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
}

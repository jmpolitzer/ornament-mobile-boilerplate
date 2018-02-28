import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../helpers/forms';

let SignUpForm = props => {
  const { handleSubmit, fields} = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <FormLabel>Name</FormLabel>
          <Field name={'name'}
                 type='text'
                 component={ReduxedFormInput} />
        <FormLabel>Email</FormLabel>
          <Field name={'email'}
                 type='text'
                 component={ReduxedFormInput} />
        <FormLabel>Password</FormLabel>
          <Field name={'password'}
                 type='text'
                 component={ReduxedFormInput} />
        <FormLabel>Confirm Password</FormLabel>
          <Field name={'confirm-password'}
                 type='text'
                 component={ReduxedFormInput} />
      </View>
      <Button title='Sign Up' onPress={handleSubmit}/>
    </ScrollView>
  );
}

SignUpForm = reduxForm({
  form: 'signUpForm'
})(SignUpForm);

export default SignUpForm;

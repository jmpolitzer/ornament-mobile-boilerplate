import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let SignInForm = props => {
  const { handleSubmit } = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <FormLabel>Email</FormLabel>
          <Field name={'email'}
                 type='text'
                 component={ReduxedFormInput} />
        <FormLabel>Password</FormLabel>
          <Field name={'password'}
                 type='password'
                 component={ReduxedFormInput} />
      </View>
      <Button title='Sign In' onPress={handleSubmit}/>
    </ScrollView>
  );
}

SignInForm = reduxForm({
  form: 'signInForm'
})(SignInForm);

export default SignInForm;

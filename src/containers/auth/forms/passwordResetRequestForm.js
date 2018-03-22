import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let ResetPasswordRequestForm = props => {
  const { handleSubmit } = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <FormLabel>Email</FormLabel>
          <Field name={'email'}
                 type='text'
                 component={ReduxedFormInput} />
      </View>
      <Button title='Reset Password' onPress={handleSubmit}/>
    </ScrollView>
  );
}

ResetPasswordRequestForm = reduxForm({
  form: 'resetPasswordRequestForm'
})(ResetPasswordRequestForm);

export default ResetPasswordRequestForm;

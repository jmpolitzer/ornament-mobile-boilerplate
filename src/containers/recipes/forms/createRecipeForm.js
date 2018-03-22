import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let CreateRecipeForm = props => {
  const { handleSubmit } = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <FormLabel>Name</FormLabel>
      <Field name='name'
             type='text'
             placeholder={'recipe name...'}
             component={ReduxedFormInput} />
      <FormLabel>Duration</FormLabel>
      <Field name='duration'
             type='text'
             placeholder={'time to prepare...'}
             component={ReduxedFormInput} />
      <Button title='Submit' onPress={handleSubmit}/>
    </ScrollView>
  );
}

CreateRecipeForm = reduxForm({
  form: 'createRecipeForm'
})(CreateRecipeForm);

export default CreateRecipeForm;

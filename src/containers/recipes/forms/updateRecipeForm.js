import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let UpdateRecipeForm = props => {
  const { handleSubmit, fields} = props;
  const key = Object.keys(fields)[0];

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <FormLabel>{key}</FormLabel>
        <Field name={key}
          type='text'
          component={ReduxedFormInput} />
      </View>
      <Button title='Submit' onPress={handleSubmit}/>
    </ScrollView>
  );
}

UpdateRecipeForm = reduxForm({
  form: 'updateRecipeForm'
})(UpdateRecipeForm);

export default UpdateRecipeForm;

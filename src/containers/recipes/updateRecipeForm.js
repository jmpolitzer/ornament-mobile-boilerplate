import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../helpers/forms';

let UpdateRecipeForm = props => {
  const { handleSubmit, fields} = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      {Object.keys(fields).map((key) => {
        return <View>
          <FormLabel>{key}</FormLabel>
            <Field name={key}
                   type='text'
                   component={ReduxedFormInput} />
        </View>
      })}
      <Button title='Submit' onPress={handleSubmit}/>
    </ScrollView>
  );
}

UpdateRecipeForm = reduxForm({
  form: 'updateRecipeForm'
})(UpdateRecipeForm);

export default UpdateRecipeForm;

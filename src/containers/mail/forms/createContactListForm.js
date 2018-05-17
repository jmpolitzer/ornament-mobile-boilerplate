import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { FormLabel, Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let CreateContactListForm = props => {
  const { handleSubmit } = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <FormLabel>Name</FormLabel>
          <Field name={'name'}
                 type='text'
                 placeholder='contact list name...'
                 component={ReduxedFormInput} />
      </View>
      <Button title='Create List' onPress={handleSubmit}/>
    </ScrollView>
  );
}

CreateContactListForm = reduxForm({
  form: 'createContactListForm'
})(CreateContactListForm);

export default CreateContactListForm;

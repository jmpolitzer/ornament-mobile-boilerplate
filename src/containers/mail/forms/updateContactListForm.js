import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ReduxedFormInput } from '../../../helpers/forms';

let UpdateContactListForm = props => {
  const { handleSubmit } = props;

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <Field name={'name'}
               type='text'
               component={ReduxedFormInput} />
      </View>
      <Button title='Update List' onPress={handleSubmit}/>
    </ScrollView>
  );
}

UpdateContactListForm = reduxForm({
  form: 'updateContactListForm'
})(UpdateContactListForm);

export default UpdateContactListForm;

import React from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';

export const ReduxedFormInput = props => {
  const { input, ...inputProps } = props;

  /* TODO: Mapping the redux-form input.onBlur to the react-native element
  interferes with blowing away the form state in the formReducer. */ 
  return (
    <View>
      <FormInput {...inputProps}
                 onChangeText={input.onChange}
                 onFocus={input.onFocus}
                 value={input.value} />
    </View>
  );
}

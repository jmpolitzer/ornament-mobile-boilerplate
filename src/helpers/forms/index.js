import React from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';

export const ReduxedFormInput = props => {
  const { input, ...inputProps } = props;

  return (
    <View>
      <FormInput {...inputProps}
                 onChangeText={input.onChange}
                 onBlur={input.onBlur}
                 onFocus={input.onFocus}
                 value={input.value} />
    </View>
  );
}

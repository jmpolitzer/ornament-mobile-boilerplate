import * as Constants from './constants';
import { ImagePicker } from 'expo';

export function selectProfilePhoto() {
  return async dispatch => {
    try {
      let data = await pickImage();

      if(!data.cancelled) {
        console.log('image', data.uri);

        return {
          type: 'SELECT_IMAGE'
        }
      } else {
        return {
          type: 'CANCEL_SELCECT_IMAGE'
        }
      }
    } catch(e) {
      console.log('error', e);
      return {
        type: 'IMAGE_PICKER_ERROR'
      }
    }
  }
}

async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 3]
  });

  return result;
}

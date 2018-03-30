import * as Constants from './constants';
import { firestorage } from '../../firebase';
import { ImagePicker } from 'expo';

export function createFirestorageBucket(email) {
  // console.log(email);
  return dispatch => {
    const storageRef = firestorage.ref();
    const profileRef = storageRef.child(`profiles/${email}`);
    // console.log(profileRef);

    return {
      type: 'CREATE_PROFILE_BUCKET_SUCCESS'
    }
  }
}

export function selectProfilePhoto() {
  return async dispatch => {
    try {
      let data = await pickImage();

      if(!data.cancelled) {
        console.log('image', data);

        return {
          type: 'SELECT_IMAGE'
        }
      } else {
        return {
          type: 'CANCEL_SELECT_IMAGE'
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
    aspect: [3, 3],
    base64: true
  });

  return result;
}

import * as Constants from './constants';
import { firestorage } from '../../firebase';
import { updateUser } from '../users/actions';
import { ImagePicker } from 'expo';

export function selectProfilePhoto(user) {
  return async dispatch => {
    try {
      let data = await pickImage();

      if(!data.cancelled) {
        dispatch(setImageUploadState(true));

        let downloadURL = await uploadImageToFireStorage(data, user.email);

        dispatch(updateUser(user.id, { profileImageURL: downloadURL }));
      } else {
        return {
          type: Constants.CANCEL_SELECT_IMAGE
        }
      }
    } catch(e) {
      /* TODO: Handle Error */
      console.log('error', e);

      return {
        type: Constants.IMAGE_PICKER_ERROR
      }
    } finally {
      dispatch(setImageUploadState(false));
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

async function uploadImageToFireStorage(data, email) {
  const response = await fetch(data.uri);
  const blob = await response.blob();
  const storageRef = firestorage.ref().child(`profileImages/${email}`);
  const uploadTask = storageRef.put(blob);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snapshot) => {
      /* TODO: Track upload progress on upload screen */
    }, (error) => {
      reject(error);
    }, () => {
      resolve(uploadTask.snapshot.downloadURL);
    });
  });
}

function setImageUploadState(bool) {
  return {
    type: Constants.PROFILE_IMAGE_IS_UPLOADING,
    imageIsUploading: bool
  }
}

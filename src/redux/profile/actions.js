import { ImagePicker } from 'expo';

export function selectProfilePhoto() {
  console.log(ImagePicker);
  return dispatch => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3]
    });

    console.log(result);

    return {
      type: 'THING'
    }
  }
}

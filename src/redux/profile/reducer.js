import * as Constants from './constants';

const initialState = {
  imageIsUploading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.PROFILE_IMAGE_IS_UPLOADING:
      return {
        ...state,
        imageIsUploading: action.imageIsUploading
      }

    default:
      return state;
  }
}

import * as Constants from './constants';

const initialState = {
  mailFolderLists: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.ON_GET_FOLDER_LISTS_FOR_USER:
      return {
        ...state,
        mailFolderLists: action.lists
      }

    default:
      return state;
  }
}

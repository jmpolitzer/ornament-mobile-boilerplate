import * as Constants from './constants';

const initialState = {
  mailFolderLists: null,
  activeList: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Constants.ON_GET_FOLDER_LISTS_FOR_USER:
      return {
        ...state,
        mailFolderLists: action.lists
      }

    case Constants.SET_ACTIVE_LIST:
      return {
        ...state,
        activeList: action.list
      }

    default:
      return state;
  }
}

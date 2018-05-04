import * as Constants from './constants';

const initialState = {
  mailFolderLists: null,
  activeList: null,
  activeListRow: null,
  activeListButton: 0
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

    case Constants.SET_ACTIVE_LIST_BUTTON:
      return {
        ...state,
        activeListButton: action.index
      }

    case Constants.SET_ACTIVE_LIST_ROW:
      return {
        ...state,
        activeListRow: action.rowId
      }

    default:
      return state;
  }
}

import R from 'ramda';
import * as Constants from './constants';

const initialState = {
  mailFolderLists: [],
  deviceContacts: [],
  selectedDeviceContacts: {},
  activeList: null,
  activeListRow: null,
  activeListButton: 0,
  showEditListMode: false,
  makingMailServerRequest: false
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

    case Constants.SHOW_EDIT_LIST_MODE:
      return {
        ...state,
        showEditListMode: action.showEditListMode
      }

    case Constants.RESET_LIST_SCREEN:
      return {
        ...state,
        showEditListMode: action.showEditListMode,
        activeListButton: action.activeListButton
      }

    case Constants.ON_MAKING_MAIL_SERVER_REQUEST:
      return {
        ...state,
        makingMailServerRequest: action.makingMailServerRequest
      }

    case Constants.ON_DELETE_LIST:
      return {
        ...state,
        mailFolderLists: R.filter(((x) => x.id !== action.listId), state.mailFolderLists)
      }

    case Constants.SELECT_DEVICE_CONTACT:
      return {
        ...state,
        selectedDeviceContacts: {
          ...state.selectedDeviceContacts,
          [action.id]: !state.selectedDeviceContacts[action.id]
        }
      }

    case Constants.SET_DEVICE_CONTACTS:
      return {
        ...state,
        deviceContacts: action.contacts
      }

    default:
      return state;
  }
}

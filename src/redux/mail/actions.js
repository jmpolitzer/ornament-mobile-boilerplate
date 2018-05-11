import { NavigationActions } from 'react-navigation';
import { Permissions, Contacts } from 'expo';
import * as Constants from './constants';
import API from '../../helpers/api';
import { handleError, dispatchError } from '../../helpers/errors';
import { updateUser } from '../users/actions';

export function getMailAccount() {
  return async dispatch => {
    try {
      const data = await API.get('/api/mail/accounts');

      dispatch(onGetMailAccount());
    } catch(e) {
      handleError('getMailAccount()', e);
      dispatchError(e);
    }
  }
}

export function createMailFolderForUser(user) {
  return async dispatch => {
    try {
      const data = await API.create('/api/mail/folders');

      dispatch(updateUser(user.id, { mailId: data.id }));
      dispatch(getMailFolder(data.id));
      dispatch(onCreateMailFolderForUser());
    } catch(e) {
      handleError('createMailFolderForUser()', e);
      dispatchError(e);
    }
  }
}

export function getMailFolderLists(folderId) {
  return async dispatch => {
    try {
      const data = await API.get(`/api/mail/folders/${folderId}`);

      dispatch(onGetMailFolderLists(data));
      dispatch(onMakingMailServerRequest(false));
    } catch(e) {
      handleError('getMailFolderLists()', e);
      dispatchError(e);
    }
  }
}

export function createContactList(folderId, form) {
  return async dispatch => {
    try {
      const body = {
        name: form.name
      };

      dispatch(onMakingMailServerRequest(true));
      dispatch(NavigationActions.back());

      const data = await API.create(`/api/mail/folders/${folderId}/lists`, body);

      dispatch(getMailFolderLists(folderId));
      dispatch(onCreateContactList());
    } catch(e) {
      handleError('createContactList()', e);
      dispatchError(e);
    }
  }
}

export function updateContactList(folderId, listId, form) {
  return async dispatch => {
    try {
      dispatch(onMakingMailServerRequest(true));
      dispatch(NavigationActions.back());

      const data = await API.update(`/api/mail/folders/${folderId}/lists/${listId}`, form);

      dispatch(getMailFolderLists(folderId));
      dispatch(resetListScreen());
      dispatch(onUpdateContactList());
    } catch(e) {
      handleError('updateContactList()', e);
      dispatchError(e);
    }
  }
}

export function deleteContactList(folderId, listId, listCount) {
  return async dispatch => {
    dispatch(onDeleteContactList(listId));

    try {
      const data = await API.delete(`/api/mail/folders/${folderId}/lists/${listId}`);

      dispatch(getMailFolderLists(folderId));
    } catch(e) {
      handleError('delectContactList()', e);
      dispatchError(e);
    }
  }
}

export function launchDeviceContacts() {
  return async dispatch => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if(permission.status !== 'granted') {
      console.log('permission denied!');

      /* TODO: Show dropdown saying to allow access to device contacts. */
      /* TODO: Dispatch permission not given. */

      return;
    }

    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBER,
        Contacts.EMAILS
      ]
    });

    if(contacts.total > 0) {
      dispatch(setDeviceContacts(contacts));
      dispatch(NavigationActions.navigate({ routeName: 'AddContacts' }));
    }
  }
}

function setDeviceContacts(contacts) {
  return {
    type: Constants.SET_DEVICE_CONTACTS,
    contacts
  }
}

export function setActiveList(list) {
  return {
    type: Constants.SET_ACTIVE_LIST,
    list
  }
}

export function setActiveListRow(rowId) {
  return {
    type: Constants.SET_ACTIVE_LIST_ROW,
    rowId
  }
}

export function setActiveListButton(index) {
  return {
    type: Constants.SET_ACTIVE_LIST_BUTTON,
    index
  }
}

export function toggleEditListMode(bool) {
  return {
    type: Constants.SHOW_EDIT_LIST_MODE,
    showEditListMode: bool
  }
}

export function resetListScreen() {
  return {
    type: Constants.RESET_LIST_SCREEN,
    showEditListMode: false,
    activeListButton: 0
  }
}

export function onMakingMailServerRequest(bool) {
  return {
    type: Constants.ON_MAKING_MAIL_SERVER_REQUEST,
    makingMailServerRequest: bool
  }
}

function onGetMailAccount() {
  return {
    type: Constants.ON_GET_MAIL_ACCOUNT
  }
}

function onCreateMailFolderForUser() {
  return {
    type: Constants.ON_CREATE_FOLDER_FOR_USER
  }
}

function onGetMailFolderLists(data) {
  return {
    type: Constants.ON_GET_FOLDER_LISTS_FOR_USER,
    lists: data.lists || []
  }
}

function onCreateContactList() {
  return {
    type: Constants.ON_CREATE_LIST
  }
}

function onUpdateContactList() {
  return {
    type: Constants.ON_UPDATE_LIST
  }
}

function onDeleteContactList(listId) {
  return {
    type: Constants.ON_DELETE_LIST,
    listId
  }
}

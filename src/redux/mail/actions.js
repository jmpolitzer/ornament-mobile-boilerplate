import { NavigationActions } from 'react-navigation';
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

      dispatch(NavigationActions.navigate({ routeName: 'Mail' }));

      const data = await API.create(`/api/mail/folders/${folderId}/lists`, body);

      dispatch(getMailFolderLists(folderId));
      dispatch(onCreateContactList());
    } catch(e) {
      handleError('createContactList()', e);
      dispatchError(e);
    }
  }
}

export function deleteContactList(list) {
  console.log('deleting contact list:', list);

  return dispatch => {
    dispatch(onDeleteContactList());
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
    lists: data.lists
  }
}

function onCreateContactList() {
  return {
    type: Constants.ON_CREATE_LIST
  }
}

function onDeleteContactList() {
  return {
    type: Constants.ON_DELETE_LIST
  }
}

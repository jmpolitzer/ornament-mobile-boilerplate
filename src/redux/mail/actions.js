import { NavigationActions } from 'react-navigation';
import * as Constants from './constants';
import API from '../../helpers/api';
import { updateUser } from '../users/actions';

export function getMailAccount() {
  return async dispatch => {
    const data = await API.get('/api/mail/accounts');

    dispatch(onGetMailAccount());
  }
}

export function createMailFolderForUser(user) {
  return async dispatch => {
    const data = await API.create('/api/mail/folders');

    dispatch(updateUser(user.id, { mailId: data.id }));
    dispatch(getMailFolder(data.id));
    dispatch(onCreateMailFolderForUser());
  }
}

export function getMailFolderLists(folderId) {
  return async dispatch => {
    const data = await API.get(`/api/mail/folders/${folderId}`);

    dispatch(onGetMailFolderLists(data));
  }
}

export function createContactList(folderId, form) {
  return async dispatch => {
    const body = {
      name: form.name
    };

    dispatch(NavigationActions.navigate({ routeName: 'Mail' }));

    const data = await API.create(`/api/mail/folders/${folderId}/lists`, body);

    dispatch(getMailFolderLists(folderId));
    dispatch(onCreateContactList());
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

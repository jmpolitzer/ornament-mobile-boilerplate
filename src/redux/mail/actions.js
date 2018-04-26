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

export function getMailFolder(folderId) {
  return async dispatch => {
    const data = await API.get(`/api/mail/folders/${folderId}`);

    dispatch(onGetMailFolder());
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

function onGetMailFolder() {
  return {
    type: Constants.ON_GET_FOLDER_FOR_USER
  }
}

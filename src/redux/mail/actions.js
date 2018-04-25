import * as Constants from './constants';
import { getFirebaseToken } from '../../redux/auth/actions';

export function getMailAccount() {
  return async dispatch => {
    const token = await getFirebaseToken();

    fetch('http://localhost:8080/api/mail/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(res => res.json())
    .then(json => console.log(json));
  }

  return {
    type: 'GET_MAIL_ACCOUNT'
  }
}

export function createMailFolderForUser() {
  return async dispatch => {
    const token = await getFirebaseToken();

    fetch('http://localhost:8080/api/mail/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(res => res.json());
  }

  /* TODO: Associate Folder ID with User in Firebase */ 

  return {
    type: 'CREATE_FOLDER_FOR_USER'
  }
}

export function getMailFolder() {
  return async dispatch => {
    const token = await getFirebaseToken();

    fetch('http://localhost:8080/api/mail/folders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(res => res.json())
    .then(json => console.log(json));
  }

  return {
    type: 'GET_FOLDER_FOR_USER'
  }
}

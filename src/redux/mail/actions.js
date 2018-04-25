import * as Constants from './constants';
import { getFirebaseToken } from '../../redux/auth/actions';

export function getSIBAccount() {
  return async dispatch => {
    const token = await getFirebaseToken();

    fetch('http://localhost:8080/api/mail/account', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(res => res.json())
    .then(json => console.log(json));
  }

  return {
    type: 'GET_FIREBASE_TOKEN'
  }
}

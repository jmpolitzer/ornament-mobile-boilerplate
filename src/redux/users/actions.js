import { firestore } from '../../firebase';
import * as Constants from './constants';
import { setSignedInUser, navigateFromSplash } from '../auth/actions';
const model = 'users';

export function fetchUser(authUser) {
  return dispatch => {
    firestore.collection(model).where('authId', '==', authUser.uid).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;

        dispatch(setSignedInUser(user));
        dispatch(navigateFromSplash('signedIn'));
      });
    })
    .catch((e) => {
      /* TODO: Handle Error */
      console.log(e);
      return {
        type: Constants.FETCH_USER_ERROR
      }
    });
  }
}

export function updateUser(id, values) {
  firestore.collection(model).doc(id).update(values);

  return {
    type: Constants.UPDATE_USER
  }
}

export function handleUserUpdate(snapshot) {
  console.log('updated user!', snapshot);

  return {
    type: 'UPDATE_SIGNED_IN_USER'
  }
}

import { Permissions, Notifications } from 'expo';
import * as Constants from './constants';
import { firestore } from '../../firebase';
import { updateUser } from '../users/actions';

export function registerForPushNotifications(user) {
  return async dispatch => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    if(existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      console.log(status);
      finalStatus = status;
    }

    if(finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();

    dispatch(updateUser(user.id, { notificationToken: token }));
  }
}

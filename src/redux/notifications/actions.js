import * as Constants from './constants';
import { firestore } from '../../firebase';
import { Permissions, Notifications } from 'expo';

export function registerForPushNotifications(email) {
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

    dispatch(setNotificationToken(email, token));
  }
}

function setNotificationToken(email, token) {
  return {
    type: Constants.SET_NOTIFICATION_TOKEN,
    notificationToken: {
      token: token,
      email: email
    }
  }
}

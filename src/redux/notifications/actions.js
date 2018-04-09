import { Permissions, Notifications } from 'expo';
import moment from 'moment';
import * as Constants from './constants';
import { firestore } from '../../firebase';
import { updateUser } from '../users/actions';

/*
https://docs.expo.io/versions/v26.0.0/guides/push-notifications
https://docs.expo.io/versions/v26.0.0/sdk/notifications

To test remote push notifications:

curl -H "Content-Type: application/json" -X POST https://exp.host/--/api/v2/push/send -d '{
"to": "ExponentPushToken[tb-hZCHP1KyDOxlV2vYAGo]",
"title": "hello",
"body": "world", "data": {"title":"A New Notification!", "body":"It looks like this thing may be working."}
}'

*/

export function registerForPushNotifications(user) {
  return async dispatch => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    if(existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      finalStatus = status;
    }

    if(finalStatus !== 'granted') {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();

    dispatch(updateUser(user.id, { notificationToken: token }));
  }
}

export function presentLocalNotification(token) {
  return async dispatch => {
    const localNotification = getSampleNotification(token);

    const presentedNotification = await Notifications.presentLocalNotificationAsync(localNotification);

    dispatch(onLocalNotificationPresented());
  }
}

export function setDatePickerValue(value) {
  return {
    type: Constants.LOCAL_NOTIFICATION_DATEPICKER_CHANGE,
    value
  }
}

export function scheduleLocalNotification(token, dateString) {
  return async dispatch => {
    const date = moment(dateString);

    if(date.isBefore(moment())) {
      dispatch(presentLocalNotification(token))
    } else {
      const schedulingOptions = { time: date.toDate() };
      const localNotification = getSampleNotification(token);

      const scheduledNotification = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);

      dispatch(onLocalNotificationScheduled());
    }
  }
}

function onLocalNotificationPresented() {
  return {
    type: Constants.LOCAL_NOTIFICATION_PRESENTED
  }
}

function onLocalNotificationScheduled() {
  return {
    type: Constants.LOCAL_NOTIFICATION_SCHEDULED
  }
}

function getSampleNotification(token) {
  return {
    to: token,
    title: 'A New Notification!',
    body: 'It looks like this thing may be working.',
    data: {
      title: 'A New Notification!',
      body: 'It looks like this thing may be working.'
    }
  }
}

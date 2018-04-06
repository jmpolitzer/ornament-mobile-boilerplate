import { Permissions, Notifications } from 'expo';
import * as Constants from './constants';
import { firestore } from '../../firebase';
import { updateUser } from '../users/actions';

/*
https://docs.expo.io/versions/v26.0.0/guides/push-notifications

To test push notifications:

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

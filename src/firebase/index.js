import firebase from '@firebase/app';
import '@firebase/firestore';
import Config from '../../src/config';

const config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.AUTH_DOMAIN,
  databaseURL: Config.DATABASE_URL,
  projectId: Config.PROJECT_ID,
  storageBucket: Config.STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

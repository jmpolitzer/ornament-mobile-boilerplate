import firebase from 'firebase';
import 'firebase/firestore';
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

/* Received error from Firebase with instructions to do this. */
const firestoreSetup = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestoreSetup.settings(settings);

export const firestore = firestoreSetup;
export const fireauth = firebase.auth();
export const firestorage = firebase.storage();

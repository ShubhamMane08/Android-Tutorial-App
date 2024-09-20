import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDacyBr8SIg0ZGL8xLLdlAxR3piG4TfcMw',
  authDomain: 'auto-student-management.firebaseapp.com',
  databaseURL: 'https://auto-student-management-default-rtdb.firebaseio.com',
  projectId: 'auto-student-management',
  storageBucket: 'auto-student-management.appspot.com',
  messagingSenderId: '325002502855',
  appId: '1:325002502855:web:66d489457d515793a054e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { database, auth };
export const { databaseURL } = firebaseConfig;


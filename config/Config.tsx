import { getDatabase } from "firebase/database";
import { getAuth} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-1bLWY8XfQPkHHU4ahe4fXPyJFjR1Pkk",
  authDomain: "prueba-1-96eb2.firebaseapp.com",
  databaseURL: "https://prueba-1-96eb2-default-rtdb.firebaseio.com",
  projectId: "prueba-1-96eb2",
  storageBucket: "prueba-1-96eb2.appspot.com",
  messagingSenderId: "848654318661",
  appId: "1:848654318661:web:7c09052d49625ab035b72c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
// export const auth = getAuth();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
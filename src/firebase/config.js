import { initializeApp } from 'firebase/app';
import {getAuth} from  'firebase/auth'
import { getFirestore } from 'firebase/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyABWDLbGrYOXrgcW6bZLpjjOtUsOrl674A",
    authDomain: "olx-clone-179e9.firebaseapp.com",
    projectId: "olx-clone-179e9",
    storageBucket: "olx-clone-179e9.appspot.com",
    messagingSenderId: "501788564500",
    appId: "1:501788564500:web:4c78dd8e1b5a9e73fa9b01",
    measurementId: "G-075L9TG9R3"
  };

 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const auth = getAuth(app)



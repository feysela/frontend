// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBYvMX7trBue2AkJg1ORHlchyP6JjuijX4",
  authDomain: "quraan-718a0.firebaseapp.com",
  projectId: "quraan-718a0",
  storageBucket: "quraan-718a0.appspot.com",
  messagingSenderId: "255111591451",
  appId: "1:255111591451:web:2c69c3ecc66c4e0df3eabe"
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
// Initialize Cloud Firestore and get a reference to the service
export const imageDb=getStorage(app);

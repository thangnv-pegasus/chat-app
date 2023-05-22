// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwUZ2Lo_vCmt-CIuTObR4D4HP5_lr0Ju4",
  authDomain: "chat-app-2-7b1f0.firebaseapp.com",
  projectId: "chat-app-2-7b1f0",
  storageBucket: "chat-app-2-7b1f0.appspot.com",
  messagingSenderId: "281493814774",
  appId: "1:281493814774:web:bd504d2eccf96a8a1cdbd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
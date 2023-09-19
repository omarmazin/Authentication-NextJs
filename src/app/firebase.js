// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs6ZmIdCJbTU5DkRYYTJmwZdXCXpUAkdU",
  authDomain: "nextjs-authentication-huaduf.firebaseapp.com",
  projectId: "nextjs-authentication-huaduf",
  storageBucket: "nextjs-authentication-huaduf.appspot.com",
  messagingSenderId: "132701533337",
  appId: "1:132701533337:web:d452c1d72c11287be23408",
  measurementId: "G-QSTH3MQKG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvIFCKOE2ExtYiQeqn94LfVUyHjpKK_yk",
  authDomain: "umdlaundry.firebaseapp.com",
  databaseURL: "https://umdlaundry-default-rtdb.firebaseio.com",
  projectId: "umdlaundry",
  storageBucket: "umdlaundry.appspot.com",
  messagingSenderId: "599983212187",
  appId: "1:599983212187:web:091be10de0177bcd20e83e",
  measurementId: "G-5Y38YQY8Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
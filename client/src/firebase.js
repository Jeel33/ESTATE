// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-65691.firebaseapp.com",
  projectId: "mern-estate-65691",
  storageBucket: "mern-estate-65691.appspot.com",
  messagingSenderId: "242136681460",
  appId: "1:242136681460:web:2878d5e091b1a5235647a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
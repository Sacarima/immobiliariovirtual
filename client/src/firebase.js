// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "immobiliaro-virtual.firebaseapp.com",
  projectId: "immobiliaro-virtual",
  storageBucket: "immobiliaro-virtual.appspot.com",
  messagingSenderId: "655161387895",
  appId: "1:655161387895:web:67e816cd6db066efe04f72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
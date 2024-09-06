// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  
  // in vite we have use import.meta.env instead of process.env
  authDomain: "mern-blog-3c5cf.firebaseapp.com",
  projectId: "mern-blog-3c5cf",
  storageBucket: "mern-blog-3c5cf.appspot.com",
  messagingSenderId: "1091683989002",
  appId: "1:1091683989002:web:1677eac94bbb24fec411f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
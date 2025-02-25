import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ-oFBmgVlKEJ71UvEVbfuxModldMtD5s",
  authDomain: "my-react-blog-7dd14.firebaseapp.com",
  projectId: "my-react-blog-7dd14",
  storageBucket: "my-react-blog-7dd14.firebasestorage.app",
  messagingSenderId: "162011306876",
  appId: "1:162011306876:web:17e6a18dce06b9a34ae2f9",
  measurementId: "G-PHX9E204E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

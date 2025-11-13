// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: //API Key Here,
  authDomain: "personal-portfolio---hosted.firebaseapp.com",
  databaseURL: "https://personal-portfolio---hosted-default-rtdb.firebaseio.com",
  projectId: "personal-portfolio---hosted",
  storageBucket: "personal-portfolio---hosted.firebasestorage.app",
  messagingSenderId: "1035533351041",
  appId: "1:1035533351041:web:27bb312aff80692fbdb580"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

console.log("Firebase Initialised")

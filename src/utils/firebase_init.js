// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9QUBU86ncqU9AwNmHY6IgF2sKGIRTwM",
  authDomain: "personal-portfolio-f9c04.firebaseapp.com",
  projectId: "personal-portfolio-f9c04",
  storageBucket: "personal-portfolio-f9c04.firebasestorage.app",
  messagingSenderId: "952248724794",
  appId: "1:952248724794:web:fa0d0317cfee93c6cdb403"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

console.log("Firebase Initialised")

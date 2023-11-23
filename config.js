import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEJWxywSpnWAQtfT6bUuPg1bEa7n2UGmI",
    authDomain: "zaki-todo.firebaseapp.com",
    projectId: "zaki-todo",
    storageBucket: "zaki-todo.appspot.com",
    messagingSenderId: "412029717355",
    appId: "1:412029717355:web:d4f7a00dd400f42c6eda2e",
    measurementId: "G-FK8K49WNR7"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
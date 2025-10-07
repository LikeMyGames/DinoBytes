// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcgpyJBEPn6gXQ4bRATkEaM6LXdJUtM6k",
    authDomain: "dinobytes-20fc4.firebaseapp.com",
    projectId: "dinobytes-20fc4",
    storageBucket: "dinobytes-20fc4.firebasestorage.app",
    messagingSenderId: "67686195411",
    appId: "1:67686195411:web:e373774f734e18aabe3426",
    measurementId: "G-C1CDCDBB29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
'use server'
import { FirebaseApp, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(process.env["FIREBASE_API_KEY"])
const firebaseConfig = {
    apiKey: process.env["FIREBASE_API_KEY"],
    authDomain: process.env["FIREBASE_AUTH_DOMAIN"],
    projectId: process.env["FIREBASE_PROJECT_ID"],
    storageBucket: process.env["FIREBASE_STORAGE_BUCKET"],
    messagingSenderId: process.env["FIREBASE_MESSAGING_SENDER_ID"],
    appId: process.env["FIREBASE_APP_ID"],
    measurementId: process.env["FIREBASE_MEASUREMENT_ID"]
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export async function GetApp(): Promise<FirebaseApp> {
    return app
}
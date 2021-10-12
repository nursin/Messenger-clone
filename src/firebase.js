import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAr1YjLwc28st9Jw3xobjTFRFLvTlzgwoo",
    authDomain: "messenger-clone-d5efd.firebaseapp.com",
    projectId: "messenger-clone-d5efd",
    storageBucket: "messenger-clone-d5efd.appspot.com",
    messagingSenderId: "835189780346",
    appId: "1:835189780346:web:9fef1f30cef5d8ec1670c3",
    measurementId: "G-7LB39TRS8Q"
});

const db = firebaseApp.firestore();

export default db;
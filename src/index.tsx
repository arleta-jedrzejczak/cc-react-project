import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import firebase from "firebase";

require('firebase/firestore')

firebase.initializeApp({
   apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "devian-f33b2.firebaseapp.com",
    databaseURL: "https://devian-f33b2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "devian-f33b2",
    storageBucket: "devian-f33b2.appspot.com",
    messagingSenderId: "143462962223",
    appId: "1:143462962223:web:2a6d74a252c2559c4922da",
    measurementId: "G-X7HTMZY5XD"
});

ReactDOM.render(
   <BrowserRouter basename={window.location.pathname || ''}>
      <App />
   </BrowserRouter>, document.getElementById('root')
);


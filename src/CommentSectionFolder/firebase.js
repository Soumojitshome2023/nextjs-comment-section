import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get, remove } from 'firebase/database';

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCbhDpY7NmMrh8oTCHFw4PT13RsSoLY1O8",
    authDomain: "comment-section-92359.firebaseapp.com",
    projectId: "comment-section-92359",
    storageBucket: "comment-section-92359.appspot.com",
    messagingSenderId: "653021189961",
    appId: "1:653021189961:web:6edeea587d14787927ec98",
    measurementId: "G-CYG6JG8FL9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, ref, push, set, get, remove, auth };
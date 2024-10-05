// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAoBzhFtmWieCOzgK-c3u1-sOVbWVleBMM",
    authDomain: "arun-netflix.firebaseapp.com",
    projectId: "arun-netflix",
    storageBucket: "arun-netflix.appspot.com",
    messagingSenderId: "546745253303",
    appId: "1:546745253303:web:306e686bfffc941af0fc32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(app);

export { storage };
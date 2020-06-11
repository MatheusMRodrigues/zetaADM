import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

firebase.initializeApp({
    apiKey: "AIzaSyB-f48CfOu4tjrSi2nXwVUzSSUhxYFgsO8",
    authDomain: "zeta-3dc4f.firebaseapp.com",
    databaseURL: "https://zeta-3dc4f.firebaseio.com",
    projectId: "zeta-3dc4f",
    storageBucket: "zeta-3dc4f.appspot.com",
    messagingSenderId: "936877882314",
    appId: "1:936877882314:web:a38e5b22e039cec5ddad33",
    measurementId: "G-1PZW0THXFP"
});

export const db = firebase.firestore()

export const auth = firebase.auth()

export const storage = firebase.storage()
import * as firebase from 'firebase'

const db  = firebase.initializeApp({
    apiKey: "AIzaSyA_plZUS7FFymrdca5dBVvefp5hLrXUHuA",
    authDomain: "stfu-90f02.firebaseapp.com",
    databaseURL: "https://stfu-90f02.firebaseio.com",
    projectId: "stfu-90f02",
    storageBucket: "stfu-90f02.appspot.com",
    messagingSenderId: "874644612773",
    appId: "1:874644612773:web:f4c7e7b21470edbaf18f4c",
    measurementId: "G-70NX0KWGXZ"
});


export default db;
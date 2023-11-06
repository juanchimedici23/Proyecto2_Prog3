import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAqBhJbVv_BPgayUZARos25XVk3Mo3qs50",
    authDomain: "proyectofinalprog3-64b85.firebaseapp.com",
    projectId: "proyectofinalprog3-64b85",
    storageBucket: "proyectofinalprog3-64b85.appspot.com",
    messagingSenderId: "781937803071",
    appId: "1:781937803071:web:c3bb076a8f23118d295d8a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

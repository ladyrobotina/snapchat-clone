import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJLJTGzVzGPEKcsBr3WVl6zYnEvYrXutc",
    authDomain: "snapchat-clone-d8b93.firebaseapp.com",
    projectId: "snapchat-clone-d8b93",
    storageBucket: "snapchat-clone-d8b93.appspot.com",
    messagingSenderId: "506434457104",
    appId: "1:506434457104:web:60770e861fd3f92366c495",
    measurementId: "G-REGBVESPJG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };
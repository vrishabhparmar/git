import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyDldeamJ6fRXQC9MEk01q_6_S8lsHvahCI",
    authDomain: "insta-clone-94408.firebaseapp.com",
    databaseURL: "https://insta-clone-94408.firebaseio.com",
    projectId: "insta-clone-94408",
    storageBucket: "insta-clone-94408.appspot.com",
    messagingSenderId: "1067972811665",
    appId: "1:1067972811665:web:ee2db94f2ffd7917c31830"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};




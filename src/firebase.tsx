import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyD4l4SEQ4_6inrapevoBVTtB4GQaVtTf_U",
    authDomain: "netflix-clone-final-proj-b4b6b.firebaseapp.com",
    projectId: "netflix-clone-final-proj-b4b6b",
    storageBucket: "netflix-clone-final-proj-b4b6b.appspot.com",
    messagingSenderId: "305019028536",
    appId: "1:305019028536:web:8a44cf9e4d9a7f95e352cd"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

export { auth}
export default db;
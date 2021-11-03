import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyBKLWhCEyGVTZzp7C0AyFo9qljXqezXvjE",
  authDomain: "textosingles-33131.firebaseapp.com",
  projectId: "textosingles-33131",
  storageBucket: "textosingles-33131.appspot.com",
  messagingSenderId: "75007833526",
  appId: "1:75007833526:web:10c268feb79e2a3b183d17",
  measurementId: "G-44B3TJK5D0"
};

if (!firebase.apps.length) {
 firebase.initializeApp(firebaseConfig);
  
}

export default firebase;
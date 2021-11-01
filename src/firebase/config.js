import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDKUuSnqAHxJz6YXKFOxeFBzS1mDH4iA4g',
  authDomain: 'gym-diary-7ff93.firebaseapp.com',
  databaseURL: 'https://gym-diary-7ff93-default-rtdb.firebaseio.com',
  projectId: 'gym-diary-7ff93',
  storageBucket: 'gym-diary-7ff93.appspot.com',
  messagingSenderId: '805809175057',
  appId: '1:805809175057:web:2e95b5faf3d9ad844e8fb0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };

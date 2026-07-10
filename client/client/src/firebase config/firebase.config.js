import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhVJXWcJ0Ek2oBaef1VTJiNrJsJQYsncU',
  authDomain: 'taskmanager-4eb39.firebaseapp.com',
  projectId: 'taskmanager-4eb39',
  storageBucket: 'taskmanager-4eb39.appspot.com',
  messagingSenderId: '678570759570',
  appId: '1:678570759570:web:a3623951a86eb04ed7dd4b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

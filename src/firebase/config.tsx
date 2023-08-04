// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0uAKGrpSlFiXcYMWHVb_X3n8owOjhzH0",
  authDomain: "aca-quiz-2023.firebaseapp.com",
  projectId: "aca-quiz-2023",
  storageBucket: "aca-quiz-2023.appspot.com",
  messagingSenderId: "560782113387",
  appId: "1:560782113387:web:dbd49210b0b9881d5a8f2e",
  measurementId: "G-90Z7X0K8CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);


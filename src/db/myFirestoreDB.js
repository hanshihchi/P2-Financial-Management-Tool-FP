import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb9ohYUjh66vX1kP5mDmt7WSykAUQNCeY",
  authDomain: "financial-management-ccfd9.firebaseapp.com",
  projectId: "financial-management-ccfd9",
  storageBucket: "financial-management-ccfd9.firebasestorage.app",
  messagingSenderId: "551923151516",
  appId: "1:551923151516:web:7a733d75c751c51eeab359",
  measurementId: "G-KYWH7QY44F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
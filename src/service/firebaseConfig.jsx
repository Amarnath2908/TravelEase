// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfFl-yi3PxD3PeTYQwH0MR0l6s-Rgl1LY",
  authDomain: "smart-travel-guide-4f58c.firebaseapp.com",
  projectId: "smart-travel-guide-4f58c",
  storageBucket: "smart-travel-guide-4f58c.firebasestorage.app",
  messagingSenderId: "726420176690",
  appId: "1:726420176690:web:107c9224beef67c947a12b",
  measurementId: "G-9277VLCN3H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
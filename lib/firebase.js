// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "impowered-platform.firebaseapp.com",
  projectId: "impowered-platform",
  storageBucket: "gs://impowered-funnel.appspot.com",
  messagingSenderId: "637236465117",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-Y4X16MBNQ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore()

export const storage = getStorage(app);
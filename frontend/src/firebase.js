import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWgK6l253kKhdqCHswTQ5b0vfwZsN6_Rs",
  authDomain: "nasahackathon-f33a9.firebaseapp.com",
  projectId: "nasahackathon-f33a9",
  storageBucket: "nasahackathon-f33a9.firebasestorage.app",
  messagingSenderId: "111808160443",
  appId: "1:111808160443:web:f578d99d95e40fcd35ff9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export commonly used services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

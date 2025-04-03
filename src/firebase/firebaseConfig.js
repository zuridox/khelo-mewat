import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0SU2ifZyWaTycOXsRguaps8O7p0Q9c1A",
  authDomain: "khelo-mewat.firebaseapp.com",
  projectId: "khelo-mewat",
  storageBucket: "khelo-mewat.firebasestorage.app",
  messagingSenderId: "157793361282",
  appId: "1:157793361282:web:29f2a145a9e41964f8c39b",
  databaseURL: "https://khelo-mewat-default-rtdb.asia-southeast1.firebasedatabase.app" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
export default app;


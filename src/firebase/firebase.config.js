// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADHDClHEbiCIftn94R-oOPo1OQUAM3cKQ",
  authDomain: "my-server-d33de.firebaseapp.com",
  databaseURL: "https://my-server-d33de-default-rtdb.firebaseio.com",
  projectId: "my-server-d33de",
  storageBucket: "my-server-d33de.firebasestorage.app",
  messagingSenderId: "769278196946",
  appId: "1:769278196946:web:c1ed9213ae2b4e83bb410b",
  measurementId: "G-5VYRZ94GHQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
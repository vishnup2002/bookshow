import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwXQH6fBBblfHmKrlqzy35wEaN407dQW4",
  authDomain: "bookshow-c80e6.firebaseapp.com",
  projectId: "bookshow-c80e6",
  storageBucket: "bookshow-c80e6.appspot.com",
  messagingSenderId: "393800862605",
  appId: "1:393800862605:web:63d18e82fa66f253544bc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

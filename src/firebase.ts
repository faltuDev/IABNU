import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB_cADfkDe6nzwhhEZ3jnaYzKZJFC4DjFA",
  authDomain: "iabnu-app.firebaseapp.com",
  databaseURL: "https://iabnu-app-default-rtdb.firebaseio.com",
  projectId: "iabnu-app",
  storageBucket: "iabnu-app.firebasestorage.app",
  messagingSenderId: "8850021131",
  appId: "1:8850021131:web:1cb34e40840d8c40cbe00e",
  measurementId: "G-4SZTZN481C"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
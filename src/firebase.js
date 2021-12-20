
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// const firebaseConfig = {
//   apiKey: "AIzaSyDXDIVzYjw_aSrdn1P5v08dnd1BCn0R8U8",
//   authDomain: "one-to-one-chat-d3639.firebaseapp.com",
//   databaseURL: "https://one-to-one-chat-d3639.firebaseapp.com",
//   projectId: "one-to-one-chat-d3639",
//   storageBucket: "one-to-one-chat-d3639.appspot.com",
//   messagingSenderId: "3515279910",
//   appId: "1:3515279910:web:e804fe94f5440fbfc4d4e7"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDuJIGCAU7qRTmmd7J-423i_ftmVAe8GmQ",
  authDomain: "one-to-one-chat-app-62604.firebaseapp.com",
  projectId: "one-to-one-chat-app-62604",
  storageBucket: "one-to-one-chat-app-62604.appspot.com",
  messagingSenderId: "1034448545224",
  appId: "1:1034448545224:web:b76c24c75800ee4cfcccfd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDet2ddyl5fxjczjMHwEuyJhTViXIqdmt0",
  authDomain: "vehicle-vault-1e1bd.firebaseapp.com",
  projectId: "vehicle-vault-1e1bd",
  storageBucket: "vehicle-vault-1e1bd.appspot.com",
  messagingSenderId: "842991560848",
  appId: "1:842991560848:web:16247d7dcc24fdf6565015",
  measurementId: "G-Y25KFGGRFP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
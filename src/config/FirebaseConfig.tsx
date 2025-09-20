import { initializeApp } from "firebase/app";
import { initializeAuth  } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const { getReactNativePersistence } = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyCK-qdcv4ZXaLTagvESKk0q12aFriuuiC0",
  authDomain: "cp4-mobile-b4ba1.firebaseapp.com",
  projectId: "cp4-mobile-b4ba1",
  storageBucket: "cp4-mobile-b4ba1.firebasestorage.app",
  messagingSenderId: "190344449777",
  appId: "1:190344449777:web:e5e009cc7e8d4e63676350",
  measurementId: "G-FY5082WF5Z"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app)

export { auth , db };
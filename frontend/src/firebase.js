import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDw3wv97GoCk_sFRDGFk9z6qEnJLSKurwE",
  authDomain: "groceryfresh-b4f9e.firebaseapp.com",
  projectId: "groceryfresh-b4f9e",
  storageBucket: "groceryfresh-b4f9e.firebasestorage.app",
  messagingSenderId: "174546966966",
  appId: "1:174546966966:web:da39f459b2603d43ef8917",
  measurementId: "G-TS74QR5G6E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;

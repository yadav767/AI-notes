// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "authexamnotes-6c7a2.firebaseapp.com",
    projectId: "authexamnotes-6c7a2",
    storageBucket: "authexamnotes-6c7a2.firebasestorage.app",
    messagingSenderId: "417283844187",
    appId: "1:417283844187:web:fe80abc57d556ca828f77e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export { auth, provider }
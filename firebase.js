import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, RecaptchaVerifier, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDhrei9gWA6S4hXDBbiKds4cn9XpbvADRo",
    authDomain: "usman-8f5aa.firebaseapp.com",
    projectId: "usman-8f5aa",
    storageBucket: "usman-8f5aa.firebasestorage.app",
    messagingSenderId: "309827968504",
    appId: "1:309827968504:web:83039d10a2b993add5ca0d",
    measurementId: "G-E47B9889EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, createUserWithEmailAndPassword, updateProfile, RecaptchaVerifier, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, provider, sendPasswordResetEmail } 
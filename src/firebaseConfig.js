// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9QmuezFvf-W_trTR3BE3i2_4n5-NzQF0",
    authDomain: "goaltree-2c941.firebaseapp.com",
    projectId: "goaltree-2c941",
    storageBucket: "goaltree-2c941.appspot.com", // Corrected storage bucket URL
    messagingSenderId: "755463001663",
    appId: "1:755463001663:web:0435e02a43e3e2d7184a8a",
    measurementId: "G-MQ7K2PTTRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Analytics
const analytics = getAnalytics(app);

// Export services
export {db, auth };

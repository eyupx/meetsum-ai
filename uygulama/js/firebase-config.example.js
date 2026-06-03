/* Firebase Config */
/* Bu dosyayi firebase-config.js olarak kopyalayin ve kendi Firebase bilgilerinizi girin */
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const ADMIN_EMAILS = ['your-email@example.com'];

async function getOrCreateUserDoc(user) {
  // ... user document logic
}

/* Firebase bilgilerinizi almak icin: https://console.firebase.google.com */
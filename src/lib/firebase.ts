import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// IMPORTANTE: Reemplaza estos valores con los de TU proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1BkwHMaZ2R3Pd_cDv0MvKYC63Jfca81M",
  authDomain: "akiro-eva-prode.firebaseapp.com",
  projectId: "akiro-eva-prode",
  storageBucket: "akiro-eva-prode.firebasestorage.app",
  messagingSenderId: "431535162318",
  appId: "1:431535162318:web:2202a0ca2b521fbe27219f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
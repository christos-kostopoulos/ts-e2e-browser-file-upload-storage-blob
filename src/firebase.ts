// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVX0io6NEQriooWXhm-GBFOs8UY6WsYIs",
  authDomain: "sequest-services.firebaseapp.com",
  projectId: "sequest-services",
  storageBucket: "sequest-services.appspot.com",
  messagingSenderId: "766478212570",
  appId: "1:766478212570:web:341947fb116f0c3f9174e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
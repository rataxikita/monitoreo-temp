import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCveC6TbdhISAPVeN-ttexqsIu9TmV5ADo", 
  authDomain: "monitoreo-temp-3c297.firebaseapp.com", 
  projectId: "monitoreo-temp-3c297",
  storageBucket: "monitoreo-temp-3c297.appspot.com", 
  messagingSenderId: "678858060192", 
  appId: "1:678858060192:android:63455a6d400822484934c5", 
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export { app, auth }; 
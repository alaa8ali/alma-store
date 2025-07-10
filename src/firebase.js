// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// إعدادات مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXUYQMQQe3SQzja6s46WZNvVwpw15cumM",
  authDomain: "alma-store-98.firebaseapp.com",
  projectId: "alma-store-98",
  storageBucket: "alma-store-98.appspot.com",
  messagingSenderId: "644439692853",
  appId: "1:644439692853:web:9108dea6ae16846498037c"
};

// تهيئة التطبيق وربط الخدمات
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);        // قاعدة البيانات
export const storage = getStorage(app);     // التخزين السحابي

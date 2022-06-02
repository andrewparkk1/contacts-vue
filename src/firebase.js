import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDvfudS1uBc8sJVLt1xAtJFQXb0fKvly14",
    authDomain: "contacts-110d3.firebaseapp.com",
    projectId: "contacts-110d3",
    storageBucket: "contacts-110d3.appspot.com",
    messagingSenderId: "847066669326",
    appId: "1:847066669326:web:8cd84b21d770971fa5775f",
    measurementId: "G-5LD1SQMCSX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default firebaseApp.firestore();
export { db };
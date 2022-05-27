// // import firebase from "./firebase";
// import firebase from "./firebase";


// var firebaseConfig = {
//     apiKey: "AIzaSyDvfudS1uBc8sJVLt1xAtJFQXb0fKvly14",
//     authDomain: "contacts-110d3.firebaseapp.com",
//     projectId: "contacts-110d3",
//     storageBucket: "contacts-110d3.appspot.com",
//     messagingSenderId: "847066669326",
//     appId: "1:847066669326:web:8cd84b21d770971fa5775f",
//     measurementId: "G-5LD1SQMCSX"
// };

// // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);


// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyDvfudS1uBc8sJVLt1xAtJFQXb0fKvly14",
//     authDomain: "contacts-110d3.firebaseapp.com",
//     projectId: "contacts-110d3",
//     storageBucket: "contacts-110d3.appspot.com",
//     messagingSenderId: "847066669326",
//     appId: "1:847066669326:web:8cd84b21d770971fa5775f",
//     measurementId: "G-5LD1SQMCSX"
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);


// const docRef = await addDoc(collection(db, "contacts"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// });
// console.log("Document written with ID: ", docRef.id);





// import firebase from './firebase'
// import { ref, onUnmounted } from 'vue'

// const config = {
//     apiKey: "AIzaSyDvfudS1uBc8sJVLt1xAtJFQXb0fKvly14",
//     authDomain: "contacts-110d3.firebaseapp.com",
//     projectId: "contacts-110d3",
//     storageBucket: "contacts-110d3.appspot.com",
//     messagingSenderId: "847066669326",
//     appId: "1:847066669326:web:8cd84b21d770971fa5775f",
//     measurementId: "G-5LD1SQMCSX"
// };

// const firebaseApp = firebase.initializeApp(config)

// const db = firebaseApp.firestore()
// const usersCollection = db.collection('contacts')

// export const createUser = user => {
//     return usersCollection.add(user)
// }

// export const getUser = async id => {
//     const user = await usersCollection.doc(id).get()
//     return user.exists ? user.data() : null
// }

// export const updateUser = (id, user) => {
//     return usersCollection.doc(id).update(user)
// }

// export const deleteUser = id => {
//     return usersCollection.doc(id).delete()
// }

// export const useLoadUsers = () => {
//     const users = ref([])
//     const close = usersCollection.onSnapshot(snapshot => {
//         users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//     })
//     onUnmounted(close)
//     return users
// }
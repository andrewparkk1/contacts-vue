<template>

    <div class="fixed z-[1] pt-28 left-0 top-0 w-full h-full overflow-auto bg-white bg-slate-600/50 ">
            <div class="bg-white m-auto p-12 border-2 border-gray-400 w-6/12 rounded-lg text-slate-600 font-medium">
                <div class="flex flex-row justify-between items-center text-center pb-5">
                    <h1 class="text-xl font-semibold text-center">Create a New Contact</h1>
                    <div @click="$emit('close')" class="cursor-pointer">&times;</div>
                </div>
                <form @submit="onSubmit">
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Contact Name</label>
                        <input type="text" v-model="name" placeholder="Name" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Image</label>

    
                    <img src:previewImage class="uploading-image" />
                    <input type="file" accept="image/jpeg" id="photo">


                        <!-- <input type="text" v-model="image" placeholder="Image" class="border-gray-200 border-2 rounded h-8 w-3/5"> -->
                        <!-- <label class="border-gray-200 border-2 rounded w-fit px-10 cursor-pointer">
                            <input type="file" placeholder="image" class="hidden"/> Add File
                        </label> -->
                        <!-- <input type="file" @image-added="imageHandler"> -->
                    </div>

                            <!-- <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
        </div> -->


                    <div class="flex flex-col pb-7 gap-1">
                        <label>Last Contact Date</label>
                        <input type="date" v-model="date" placeholder="Date" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <!-- <Button 
                    @btn-click="createContact" 
                    text='Add Contact'/> -->
                    <input type="submit" value="Add Contact" class="bg-blue-500 w-fit text-sm text-white py-2 px-5 rounded-lg cursor-pointer">
                </form>                    
            </div>
        </div>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/storage"; 
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import "@/firebase"

import db from "../firebase";
import Button from './Button'


import { initializeApp, firebase } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDvfudS1uBc8sJVLt1xAtJFQXb0fKvly14",
    authDomain: "contacts-110d3.firebaseapp.com",
    projectId: "contacts-110d3",
    storageBucket: "contacts-110d3.appspot.com",
    messagingSenderId: "847066669326",
    appId: "1:847066669326:web:8cd84b21d770971fa5775f",
    measurementId: "G-5LD1SQMCSX"
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
const storage = getStorage();


export default {
    name: 'CreateContact',
    components: {
        Button
    },
    data() {
        return {
            name: '',
            image: '',
            date: '',
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            const photo = document.querySelector("#photo").files[0];

            if (!this.name) {
                alert('Please add a name')
                return
            }
            if (!this.date) {
                alert('Please add a date')
                return
            }
            if (!photo) {
                alert('Please add an image')
                return
            }

            const metadata = {
                contentType: photo.type
            };

            console.log("the image type is: " + photo.type);
            console.log("the metadata is: " + metadata);

            const imageName = "images/" + new Date().getTime() + "_" + photo.name;
            console.log(imageName);

            const storageRef = ref(storage, imageName);
            const uploadTask = uploadBytesResumable(storageRef, photo, metadata);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    // });
                    console.log("uplaoded image");
                    getDownloadURL(ref(storage, imageName))
                        .then((url) => {
                            this.image = url;
                            console.log(url);
                            console.log("this image: " + this.image)
                            console.log("name is: " + this.name);
                            console.log("image is: " + this.image);
                            console.log("date is: " + this.date);

                            db.collection("contacts").add({
                                name: this.name,
                                image: this.image,
                                date: this.date
                            })
                                .then((docRef) => {
                                    console.log("Document written with ID: ", docRef.id);
                                    var c = db.collection("contacts").doc(docRef.id);
                                    c.update({
                                        id: docRef.id
                                    })
                                    .then(() => {
                                        console.log("Document successfully updated!");
                                    })
                                    .catch((error) => {
                                        // The document probably doesn't exist.
                                        console.error("Error updating document: ", error);
                                    });
                                })
                                .catch((error) => {
                                    console.error("Error adding document: ", error);
                                });

                            
                            this.$emit('add-contact')
                            this.name = ''
                            this.date = ''
                            this.image = ''
                        })

                }
            );

        }
    }
}


</script>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
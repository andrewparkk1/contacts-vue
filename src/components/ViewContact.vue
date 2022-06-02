<template>

    <div class="fixed z-[1] pt-28 left-0 top-0 w-full h-full overflow-auto bg-white bg-slate-600/50 ">
            <div class="bg-white m-auto p-12 border-2 border-gray-400 w-6/12 rounded-lg text-slate-600 font-medium">
                <div class="flex flex-row justify-between items-center text-center pb-5">
                    <h1 class="text-xl font-semibold text-center">View a Contact</h1>
                    <div @click="$emit('close')" class="cursor-pointer">&times;</div>
                </div>
                <form @submit="onSubmit">
                    <input type="text" v-model="contact.id"  class="hidden">

                    <div class="flex flex-col pb-7 gap-1">
                        <label>Contact Name</label>
                        <input type="text" v-model.lazy="contact.name"  placeholder="Name" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Image</label>
                        <div class="flex items-center gap-3">

                            <img :src="contact.image" alt="" class="w-14 h-14 object-cover rounded-full">
                            <label class="border-gray-200 border-2 rounded w-fit px-10 cursor-pointer">
                                <input type="file" accept="image/jpeg" id="pho" @change="changeName" placeholder="image" class="hidden"/> Add File
                            </label>
                            <p id="fileName-viewContact"></p>
                        </div>

                    </div>
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Last Contact Date</label>
                        <input type="date" v-model="contact.date" placeholder="Date" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <input type="submit" value="Update Contact" class="bg-blue-500 w-fit text-sm text-white py-2 px-5 rounded-lg cursor-pointer">
                </form>                    
            </div>
        </div>
</template>

<script>
import db from "../firebase";
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
const storage = getStorage();


export default {
    name: 'ViewContact',
    props: {
        contact: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            name: '',
            image: '',
            date: '',
        }
    },
    methods: {
        changeName() {
            document.querySelector('#fileName-viewContact').textContent = document.querySelector("#pho").files[0].name;
        },
        async onSubmit(e) {
            e.preventDefault()
            this.$emit('close')

            if (!this.contact.name) {
                alert('Please add a name')
                return
            }
            if (!this.contact.date) {
                alert('Please add a date')
                return
            }

            const newContact = {
                id: this.contact.id,
                name: this.contact.name,
                date: this.contact.date,
                image: ""
            }

            const photo = document.querySelector("#pho").files[0];

            if (photo) {
                console.log("there is photo");
                const metadata = {
                    contentType: photo.type
                };
                const imageName = "images/" + new Date().getTime() + "_" + photo.name;
                const storageRef = ref(storage, imageName);

                async function uploadTaskPromise() {
                    return new Promise(function(resolve, reject) {
                        const uploadTask = uploadBytesResumable(storageRef, photo, metadata);
                        uploadTask.on('state_changed',
                            function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                console.log('Upload is ' + progress + '% done')
                            },
                            function error(err) {
                                console.log('error', err)
                                reject()
                            },
                            function complete() {
                                console.log("uplaoded image");
                                getDownloadURL(ref(storage, imageName))
                                    .then((url) => {
                                        newContact['image'] = url;
                                        console.log(newContact);
                                        const c = db.collection("contacts").doc(newContact['id']);

                                        c.update({
                                            name: newContact['name'],
                                            image: newContact['image'],
                                            date: newContact['date']
                                        })
                                    })
                            }
                        )
                    })
                }

                uploadTaskPromise();

                // const uploadTask = uploadBytesResumable(storageRef, photo, metadata);
                // uploadTask.on('state_changed', 
                //     (snapshot) => {
                //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //         console.log('Upload is ' + progress + '% done');
                //     }, 
                //     (error) => {
                //         console.log("Upload error");
                //     }, 
                //     () => {
                //         console.log("uplaoded image");
                //         getDownloadURL(ref(storage, imageName))
                //             .then((url) => {
                //                 newContact['image'] = url;
                //                 console.log(newContact);
                //                 const c = db.collection("contacts").doc(newContact['id']);

                //                 c.update({
                //                     name: newContact['name'],
                //                     image: newContact['image'],
                //                     date: newContact['date']
                //                 })
                //             })
                //     }
                // );
            } else {
                const c = db.collection("contacts").doc(newContact['id']);
                c.update({
                    name: newContact['name'],
                    date: newContact['date']
                }) 
            }

            document.querySelector('#fileName-viewContact').textContent = "";

        }
    }
}


</script>

<style>
.file-name {
  position: absolute;
  bottom: -25px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
}
</style>
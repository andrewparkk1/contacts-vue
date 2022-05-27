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

                        <input type="text" v-model="image" placeholder="Image" class="border-gray-200 border-2 rounded h-8 w-3/5">
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
import firebase from "firebase/app";
import "firebase/storage"; 
import { getStorage, ref } from "firebase/storage";

import db from "../firebase";
import Button from './Button'

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
            file: null
        }
    },
    methods: {
        // imageHandler(file, Editor, cursorLocation, resetUploader) {
        //     const storageRef = getStorage();
        //     const docRef = storageRef.child(`images/${file.name}`);
        //     docRef.put(file).on(
        //     "state_changed",
        //     (snapshot) => {
        //     console.log(snapshot);
        //     },
        //     (err) => {
        //     console.log(err);
        //     },
        //     async () => {
        //         const downloadURL = await docRef.getDownloadURL();
        //         Editor.insertEmbed(cursorLocation, "image", downloadURL);
        //         resetUploader();
        //     }
        //     );
        // },
        onSubmit(e) {
            e.preventDefault()
            // const storage = getStorage(firebaseApp);
          
            // const storageRef = getStorage();
            // const docRef = storageRef.child(`images/asdf`);
            // const downloadURL = docRef.getDownloadURL();

            if (!this.name) {
                alert('Please add a name')
                return
            }
            if (!this.date) {
                alert('Please add a date')
                return
            }
            db.collection("contacts").add({
                name: this.name,
                image: this.image,
                date: this.date
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

            this.$emit('add-contact')

            this.name = ''
            this.date = ''
            this.image = ''
        }
    }
}


</script>
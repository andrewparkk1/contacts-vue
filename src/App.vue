<template>
  <div class="py-14 px-28">

      <!-- <button @click="console">asdf</button> -->

        <Header 
        @toggle-add-contact="toggleAddContact"
        :showCreateContact="showCreateContact"
        ></Header>

          <CreateContact 
      v-show="showCreateContact"
      @close="close"
      />

      <ViewContact
      v-show="showViewContact"
      @close="close"
      v-bind:contact="specificContact"
      ></ViewContact>
      
        <Contacts 
        @view-contact="viewContact"
        :contacts="contacts"
        ></Contacts>
  </div>
</template>

<script>
import '@/assets/tailwind.css'
import Header from '@/components/Header.vue'
import Contacts from '@/components/Contacts.vue'
import CreateContact from '@/components/CreateContact.vue'
import ViewContact from '@/components/ViewContact.vue'
import firebase from "firebase/app";
import "firebase/storage"; 
import db from "@/firebase";




export default {
  name: 'App',
  props: {
    showCreateContact: Boolean,
    showViewContact: Boolean,
    specificContact: Object
  },
  components: {
    Header,
    Contacts,
    CreateContact,
    ViewContact
  },
  data() {
    return {
      contacts: [],
      // contactIds: [],
      showCreateContact: false,
      showViewContact: false,
      specificContact: {}
    }
  },
  methods: {
    console() {

    },
    close() {
      this.showCreateContact = false;
      this.showViewContact = false
    },
    toggleAddContact() {
      this.showCreateContact = !this.showCreateContact
    },
    viewContact(contact) {
      this.showViewContact = true
      this.specificContact = contact
      console.log(this.specificContact)
      console.log("viewing contact")
    }
  },
  async created() {
      const snapshot = await db.collection('contacts').get();
      this.contacts = snapshot.docs.map(doc => doc.data())
  }
}
</script>

<template>
  <div class="py-14 px-28">

      <!-- <button @click="console">asdf</button> -->

        <Header 
        @toggle-add-contact="toggleAddContact"
        :showCreateContact="showCreateContact"
        ></Header>

          <CreateContact 
      v-show="showCreateContact"
      @add-contact="addContact"
      @close="close"
      />

      <ViewContact
      v-show="showViewContact"
      @close="close"
      @update-contact="updateContact"
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
import Header from '../components/Header.vue'
import Contacts from '../components/Contacts.vue'
import CreateContact from '../components/CreateContact.vue'
import ViewContact from '../components/ViewContact.vue'
import firebase from "firebase/app";
import "firebase/storage"; 
import db from "../firebase";

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
      contactIds: [],
      showCreateContact: false,
      showViewContact: false,
      specificContact: {}
    }
  },
  methods: {
    close() {
      this.showCreateContact = false;
      this.showViewContact = false
      console.log("clicked outside");
    },
    toggleAddContact() {
      this.showCreateContact = !this.showCreateContact
    },
    addContact() {
      // console.log('asdf')
      // this.contacts = [...this.contacts, contact]
      this.showCreateContact = false
    },
    updateContact(contact) {
        this.showViewContact = false;
        var c = db.collection("contacts").doc(contact['id']);
        return c.update({
            name: contact['name'],
            image: contact['image'],
            date: contact['date']
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
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
      this.contactIds = snapshot.docs.map(doc => doc.id)
      let i = 0;
      this.contacts.map(n => {
        n['id'] = this.contactIds[i];
        i++;
      })
  }
}
</script>

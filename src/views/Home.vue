<template>
  <div class="py-14 px-28">

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
    addContact(contact) {
      console.log('asdf')
      this.contacts = [...this.contacts, contact]
      this.showCreateContact = false
    },
    updateContact(contact) {
        const contactToUpdate = this.contacts[contact['id']]
        console.log(contactToUpdate)
        this.showViewContact = false
    },
    viewContact(contact) {
      this.showViewContact = true
      this.specificContact = contact
      console.log(this.specificContact)
      console.log("viewing contact")
    }
  },
  created() {
    this.contacts = [
      {
        id: 1,
        name: 'andrew',
        date: '2009-05-05',
        image: './assets/andrew.jpeg'
      },
      {
        id: 2,
        name: 'andrew park',
        date: '2005-01-15',
        image: './assets/andrew.jpeg'
      },
      {
        id: 3,
        name: 'matthew park',
        date: '2020-12-22',
        image: '../assets/andrew.jpeg'
      }
    ]
  }
}
</script>

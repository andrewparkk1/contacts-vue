<template>
    <div :key="contact.id" v-for="contact in contacts">
        <Contact
            @view-contact="$emit('view-contact', contact)"
            :contact="contact"
        ></Contact>
    </div>
</template>

<script>
import Contact from './Contact.vue';
export default {
    name: "Contacts",
    props: {
        contacts: Array
    },
    components: { 
        Contact 
    },
    emits: ['view-contact']
}

</script>
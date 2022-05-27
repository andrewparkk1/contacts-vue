<template>

<div @click="$emit('view-contact', contact.id)" class="flex flex-row border-gray-200 border-2 items-center py-3 px-5 my-3 w-4/6 rounded-lg justify-between cursor-pointer">
    <img src='../assets/andrew.jpeg' alt="" class="w-14 h-14 object-cover rounded-full">
    <p class="flex-grow pl-8 items-start">{{contact.name}}</p>
    <p>{{this.date}}</p>
</div>
    
</template>


<script>

import moment from 'moment'

export default {
    name: 'Contact',
    props: {
        contact: Object,
        date: String
    },
    data() {
        return {
            date: moment(this.contact.date).format('MMMM D, Y')
        }
    },
}


</script>
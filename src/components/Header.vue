<template>
    <div class="flex flex-row justify-between pb-16">
        <h1 class="font-medium text-3xl">Contacts</h1>
        <Button 
        @btn-click="$emit('toggle-add-contact')" 
        text='&plus; Add Contact'/>
    </div>
</template>

<script>
import Button from "./Button.vue";

export default {
    name: 'Header',
    props: {
        showCreateContact: Boolean
    },
    components: {
        Button
    }
}


</script>
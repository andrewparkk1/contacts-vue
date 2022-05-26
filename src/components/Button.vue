<template>
    <button @click="this.$emit('btn-click')" class="bg-blue-600 text-white px-5 py-3 text-md rounded-lg">{{text}}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String
    }
}

</script>
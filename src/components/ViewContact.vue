<template>

    <div class="fixed z-[1] pt-28 left-0 top-0 w-full h-full overflow-auto bg-white bg-slate-600/50 ">
            <div class="bg-white m-auto p-12 border-2 border-gray-400 w-6/12 rounded-lg text-slate-600 font-medium">
                <div class="flex flex-row justify-between items-center text-center pb-5">
                    <h1 class="text-xl font-semibold text-center">View a Contact</h1>
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
                            <input type="file" v-model="image" placeholder="image" class="hidden"/> Add File
                        </label> -->

                    </div>
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Last Contact Date</label>
                        <input type="date" v-model="date" placeholder="Date" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <!-- change this to button type -->
                    <input type="submit" value="Save Task" class="bg-blue-500 w-fit text-sm text-white py-2 px-5 rounded-lg cursor-pointer">
                </form>                    
            </div>
        </div>
</template>

<script>
export default {
    name: 'ViewContact',
    props: {
        contact: Object
    },
    data() {
        return {
            name: contact.name,
            image: "contact.image",
            date: "contact.date"
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            console.log(contact['name'])

            // if (!this.name) {
            //     alert('Please add a name')
            //     return
            // }
            // if (!this.date) {
            //     alert('Please add a date')
            //     return
            // }

            // const newContact = {
            //     id: Math.floor(Math.random() * 10000),
            //     name: this.name,
            //     date: this.date,
            //     image: this.image
            // }

            // this.$emit('add-contact', newContact)

            // console.log(newContact)

            // this.name = ''
            // this.date = ''
            // this.image = ''
        }
    }
}


</script>
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
                        <!-- <img :src="contact.image" alt=""> -->

                        <input type="text" v-model="contact.image" placeholder="Image" class="border-gray-200 border-2 rounded h-8 w-3/5">
                        <!-- <label class="border-gray-200 border-2 rounded w-fit px-10 cursor-pointer">
                            <input type="file" v-model="image" placeholder="image" class="hidden"/> Add File
                        </label> -->

                    </div>
                    <div class="flex flex-col pb-7 gap-1">
                        <label>Last Contact Date</label>
                        <input type="date" v-model="contact.date" placeholder="Date" class="border-gray-200 border-2 rounded h-8 w-3/5">
                    </div>
                    <!-- change this to button type -->
                    <input type="submit" value="Update Contact" class="bg-blue-500 w-fit text-sm text-white py-2 px-5 rounded-lg cursor-pointer">
                </form>                    
            </div>
        </div>
</template>

<script>
export default {
    name: 'ViewContact',
    props: {
        contact: {
            required: true,
            type: Object
        },
    },
    // data() {
    //     return {
    //         c : {
    //             id: '',
    //             name: '',
    //             image: '',
    //             date: ''
    //         }
    //     }
    // },
    // created() {
    //     this.c = {id: this.contact.id, name: this.contact.name, image: 'asdf', date: '1222-02-05'}
    //     console.log(this.contact.name)
    // },
    methods: {
        onSubmit(e) {
            e.preventDefault()

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
                image: this.contact.image
            }

            this.$emit('update-contact', newContact)

            console.log(newContact)

            // this.name = ''
            // this.date = ''
            // this.image = ''
        }
    }
}


</script>
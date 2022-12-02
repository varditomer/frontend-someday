<template>
    <section @click="(show = true)" class="task-members flex center">
        <span v-if="prop?.length" class="task-avatar" v-for="(person, idx) in formattedPersons" :style="person.style"
            :class="{ cover: person.imgUrl }" :title="person.fullname">
            {{ !person.imgUrl ? person.initials : '' }}
        </span>
        <span v-else> </span>
        <triangle-modal :users="users" :persons="formattedPersons" :cmp="'personsModal'" @hideModal="(show=false)"
            v-if="show" />
    </section>
</template>

<script>
import triangleModal from '../option-cmps/triangle-modal.vue'
export default {
    name: 'persons-column',
    props: {
        prop: Array,
        users: Array
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        formattedPersons() {
            if (!this.prop || !this.prop.length) return ''
            if (this.prop?.length) return this.prop.map(person => {
                const { _id } = person
                const user = this.users.find(user => user._id === _id)
                if (!user) return
                const imgUrl = user.imgUrl ? true : false
                let style = `background-color: ${user.color || '#fff'}`
                if (user.imgUrl) style = `background-image: url(${user.imgUrl})`
                else style = `background-image: url(src/assets/imgs/default.svg)`
                const initials = user.fullname.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
                return { style, initials, _id, imgUrl, fullname: user.fullname }
            })
            return ''
        }
    },
    components: {
        triangleModal
    }
}
</script>
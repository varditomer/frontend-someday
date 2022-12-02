<template>
    <section @click="(show = true)" class="task-members flex center">
        <span v-if="prop" class="task-avatar" v-for="person in formattedPersons" :style="person.style"
            :class="{ cover: person.pic }" :title="person.fullname">
            {{ !person.pic ? person.initials : '' }}
        </span>
        <triangle-modal v-if="show" @removePerson="removePerson" @addPerson="addPerson" :users="users"
            :persons="formattedPersons" :cmp="'personsModal'" @hideModal="(show = false)" />
    </section>
    <!-- <span v-else></span> -->
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'persons-column',
    emits: ['updateTask'],
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
            if (!this.prop?.length) return []
            return this.prop.reduce((userArr, person) => {
                const { _id, fullname } = person
                const user = this.users.find(anyUser => anyUser._id === _id)
                if (!user) return userArr
                const style = user.imgUrl
                    ? `background-image: url(${user.imgUrl})`
                    : `backgroud-color: ${user.color || '#fff'}`
                const pic = user.imgUrl
                    ? true
                    : false
                const initials = user.fullname.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
                userArr.push({ _id, style, initials, fullname, pic })
                return userArr

            }, [])
        }
    },
    methods: {
        addPerson(person) {
            const persons = JSON.parse(JSON.stringify(this.prop))
            persons.push(person)
            this.updateTask(persons)
        },
        removePerson(personId) {
            const persons = JSON.parse(JSON.stringify(this.prop))
            const idx = persons.findIndex(person => person._id === personId)
            if (idx === -1) return
            persons.splice(idx, 1)
            this.updateTask(persons)
        },
        updateTask(persons) {
            this.$emit('updateTask', { key: 'person', val: persons })
        }
    },
    components: {
        triangleModal
    }
}
</script>
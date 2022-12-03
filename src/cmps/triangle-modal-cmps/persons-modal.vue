<template>
    <section class='persons-modal'>
        <div v-for="person in prop" class="active-persons">
            <div class="person">
                <span :style="person.style" class="task-avatar"></span>
                <p>{{ person.fullname }}</p>
                <span @click="removePerson(person._id)" v-svg-icon="'smallExit'" class="remove-person-btn"></span>
            </div>
        </div>
        <p v-if="personsToAdd.length" class="suggested-persons">Suggested people</p>
        <div class="not-active-persons">
            <div @click="addPerson(person._id)" v-for="person in personsToAdd" class="not-active-person">
                <div>
                    <img :src="person.imgUrl" />
                    <p>{{ person.fullname }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'persons-modal',
    emits: ['updateTask'],
    props: {
        prop: {
            type: Array,
            required: false
        },
        users: {
            type: Array,
            required: true
        }
    },
    computed: {
        personsToAdd() {
            if (!this.prop.length) return this.users
            if (this.users.length === this.prop.length) return []
            return this.users.filter(user => {
                if (this.prop.find(p => p._id === user._id)) return false
                return true
            })
        }
    },
    methods: {
        addPerson(personId) {
            const person = this.users.find(user => user._id === personId)
            const persons = this.prop
                ? JSON.parse(JSON.stringify(this.prop))
                : []
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
    }
}
</script>
<template>
    <section class='persons-modal'>
        <div v-for="p in persons" class="active-persons">
            <div class="person">
                <span :style="p.style" class="task-avatar"></span>
                <p>{{ p.fullname }}</p>
                <span @click="removePerson(p._id)" v-svg-icon="'smallExit'" class="remove-person-btn"></span>
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
    emits: ['addPerson','removePerson'],
    props: {
        persons: {
            type: Array,
            required: false
        },
        users: {
            type: Array,
            required: false
        }
    },
    computed: {
        personsToAdd() {
            let notActiveUsers = []
            if (!this.persons.length) return this.users
            if (this.users.length === this.persons.length) return []
            this.users.forEach(user => {
                this.persons.forEach(person => {
                    if (person._id === user._id) return
                    notActiveUsers.push(user)
                })
            })
            return notActiveUsers
        }
    },
    methods: {
        addPerson(personId) {
            console.log('Adding', personId);
            this.$emit('addPerson', personId)
        },
        removePerson(personId) {
            console.log('Removing', personId);
            this.$emit('removePerson', personId)
        }
    }
}
</script>
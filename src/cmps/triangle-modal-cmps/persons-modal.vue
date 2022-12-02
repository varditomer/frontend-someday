<template>
    <section class='persons-modal'>
        <div v-for="p in persons" class="active-persons">
            <div class="person">
                <span :style="p.style" class="task-avatar"></span>
                <p>{{ p.fullname }}</p>
            </div>
            <div class="remove-active-person">
                <span v-svg-icon="'smallExit'"></span>
            </div>
        </div>
        <p v-if="personsToAdd.length" class="suggested-persons">Suggested people</p>
        <div v-for="person in personsToAdd" class="not-active-persons">
            <div>
                <img :src="person.imgUrl" />
                <p>{{ person.fullname }}</p>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'persons-modal',
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
            if (this.users.length === this.persons.length) return []
            let notActiveUsers = []
            this.users.forEach(user => {
                this.persons.forEach(person => {
                    console.log(person._id, user._id);
                    if (person._id === user._id) return
                    notActiveUsers.push(user)
                })
            })
            return notActiveUsers
        }
    },
}
</script>
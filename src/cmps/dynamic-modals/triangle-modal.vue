<template>

    <section v-click-outside="hide" class='triangle-modal'>
        <span class="top-bot"></span>
        <component :is="cmp" :users="users" :persons="persons" @addPerson="addPerson" @removePerson="removePerson"
            :colors="colors" :content="content"></component>
    </section>

</template>

<script>
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['hideModal', 'addPerson', 'removePerson'],
    props: {
        cmp: String,
        persons: {
            type: Array,
            required: false
        },
        users: {
            type: Array,
            required: false
        },
        colors: {
            type: Array,
            required: false
        },
        content: {
            type: Array,
            required: false
        }
    },
    methods: {
        hide() {
            this.$emit('hideModal')
        },
        removePerson(userId) {
            this.$emit('removePerson', userId)
        },
        addPerson(user) {
            this.$emit('addPerson', user)
        }

    },
    components: {
        personsModal,
        taskLabelModal
    }
}
</script>
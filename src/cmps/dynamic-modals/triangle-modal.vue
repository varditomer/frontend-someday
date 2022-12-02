<template>

    <section v-click-outside="hide" class='triangle-modal'>
        <span class="top-bot"></span>
        <component :is="cmp" :prop="prop" :users="users" :persons="persons" @setDate="setDate" @addPerson="addPerson"
            @saveLink="saveLink" :link="link" @removePerson="removePerson" :colors="colors" :content="content">
        </component>
    </section>

</template>

<script>
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
import dateModal from '../triangle-modal-cmps/date-modal.vue'
import linkModal from '../triangle-modal-cmps/link-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['hideModal', 'addPerson', 'removePerson', 'setDate', 'saveLink'],
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
        },
        prop: {
            type: Number,
        },
        link: {
            type: Object,
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
        },
        setDate(timestamp) {
            this.$emit('setDate', timestamp)
        },
        saveLink(link) {
            this.$emit('saveLink', link)
        }

    },
    components: {
        personsModal,
        taskLabelModal,
        dateModal,
        linkModal
    }
}
</script>
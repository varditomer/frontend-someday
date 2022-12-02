<template>

    <section v-click-outside="hide" class='triangle-modal'>
        <span class="top-bot"></span>
        <component :is="cmp" :users="users" :persons="persons" @addPerson="addPerson" @removePerson="removePerson"
            @saveLink="saveLink" :colors="colors" :content="content" :link="link"></component>
    </section>

</template>

<script>
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
import linkModal from '../triangle-modal-cmps/link-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['hideModal', 'addPerson', 'removePerson', 'saveLink'],
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
        saveLink(link) {
            this.$emit('saveLink', link)
        }

    },
    components: {
        personsModal,
        taskLabelModal,
        linkModal
    }
}
</script>
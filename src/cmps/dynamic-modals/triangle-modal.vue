<template>

    <section class='triangle-modal' @keydown.escape="hide" v-click-outside="hide">
        <span class="top-bot"></span>
        <component :is="cmp" :content="content" :name="name" :additionalDb="additionalDb" @updateTask="updateTask"
            @hideModal="hide" @login="login">
        </component>
    </section>

</template>

<script>
import timelineModal from '../triangle-modal-cmps/timeline-modal.vue'
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
import dateModal from '../triangle-modal-cmps/date-modal.vue'
import linkModal from '../triangle-modal-cmps/link-modal.vue'
import loginSignupModal from '../triangle-modal-cmps/login-signup-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['updateTask', 'hideModal', 'login'],
    props: {
        cmp: String,
        additionalDb: {
            type: Array,
            required: false
        },
        content: {
            type: [Object, Array, String, Number],
            required: false
        },
        name: String
    },
    methods: {
        hide() {
            this.$emit('hideModal')
        },
        updateTask(field) {
            this.$emit('updateTask', field)
        },
        login(userCreds) {
            this.$emit('login', userCreds)
        }
    },
    components: {
        personsModal,
        taskLabelModal,
        dateModal,
        linkModal,
        timelineModal,
        loginSignupModal
    }
}
</script>
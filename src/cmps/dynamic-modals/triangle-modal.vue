<template>

    <section v-click-outside="hide" class='triangle-modal'>
        <span class="top-bot"></span>
        <component :users="users" :persons="persons" :colors="colors" :is="cmp" :content="content"></component>
    </section>

</template>

<script>
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['hideModal'],
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
        colors:{
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
        }
    },
    components: {
        personsModal,
        taskLabelModal
    }
}
</script>
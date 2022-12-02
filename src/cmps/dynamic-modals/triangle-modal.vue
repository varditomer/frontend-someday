<template>

    <section v-click-outside="hide" class='triangle-modal'>
        <span class="top-bot"></span>
        <component :users="users" :persons="persons" :is="cmp"></component>
    </section>

</template>

<script>
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
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
        }
    },
    methods: {
        hide() {
            this.$emit('hideModal')
        }
    },
    components: {
        personsModal
    }
}
</script>
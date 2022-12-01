<template>
    <section v-if="toShow" v-click-outside="closeModal" class='option-modal'>
        <task-option @openTask="openTask" @removeTask="removeTask"></task-option>
    </section>
</template>

<script>
import taskOption from './option-cmps/task-option.vue';
import addGroup from './option-cmps/add-group.vue';
export default {

    name: 'option-modal',
    emits: ['modalClosed', 'openTask', 'removeTask'],
    props: {
        toShow: Boolean
    },
    computed: {

    },
    methods: {
        closeModal() {
            this.$emit('modalClosed')
        },
        openTask() {
            this.$emit('openTask')
        },
        removeTask() {
            this.$emit('removeTask')
        }

    },
    components: {
        taskOption,
        addGroup
    }
}
</script>
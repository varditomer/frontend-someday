<template>
    <section v-if="toShow" v-click-outside="closeModal" class='option-modal'>
        <component :is="cmp" @openTask="openTask" @removeTask="removeTask" @addGroup="addGroup"/>
    </section>
</template>

<script>
import taskOptions from './option-cmps/task-options.vue';
import newItemOptions from './option-cmps/new-item-options.vue';
export default {

    name: 'option-modal',
    emits: ['modalClosed', 'openTask', 'removeTask'], //emit all types of dynamic cmps events
    props: {
        toShow: Boolean,
        cmp: String,
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
        },
        addGroup(){
            this.$emit('addGroup')
        }

    },
    components: { //specify each dynamic cmps thats created
        taskOptions,
        newItemOptions,
    }
}
</script>
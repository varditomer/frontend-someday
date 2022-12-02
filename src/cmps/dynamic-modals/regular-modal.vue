<template>
    <section v-if="toShow" v-click-outside="closeModal" class='regular-modal'>
        <component :is="cmp" @openTask="openTask" @removeTask="removeTask" @addGroup="addGroup"/>
    </section>
</template>

<script>
import taskOptions from '../option-cmps/task-options.vue';
import newItemModal from '../filter-modals-cmps/new-item-modal.vue';
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue';
export default {

    name: 'regular-modal',
    emits: ['modalClosed', 'openTask', 'removeTask', 'addGroup'], //emit all types of dynamic cmps events
    props: {
        toShow: Boolean,
        cmp: String,
    },
    computed: {

    },
    created() {
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
        newItemModal,
        filterPersonModal,
    }
}
</script>
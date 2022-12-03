<template>
    <section v-if="showModal" v-click-outside="closeModal" @keydown.escape="closeModal" class='regular-modal'>
        <component @filter="filter" :is="cmp" @openTask="openTask" :users="users" @removeTask="removeTask"
            @addGroup="addGroup" :groupId="groupId" />
    </section>
</template>

<script>
import taskOptModal from '../regular-modal-cmps/task-opt-modal.vue';
import groupOptModal from '../regular-modal-cmps/group-opt-modal.vue';
import newItemModal from '../filter-modals-cmps/new-item-modal.vue';
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue';
export default {

    name: 'regular-modal',
    emits: ['closeModal', 'openTask', 'removeTask', 'addGroup', 'filter'], //emit all types of dynamic cmps events
    props: {
        showModal: Boolean,
        cmp: String,
        users: Array,
        groupId: String,
    },
    computed: {

    },
    created() {
    },
    methods: {
        closeModal() {
            console.log(`modelClose:`)
            this.$emit('closeModal')
        },
        openTask() {
            this.$emit('openTask')
        },
        removeTask() {
            this.$emit('removeTask')
        },
        addGroup() {
            this.$emit('addGroup')
        },
        filter(filterBy) {
            this.$emit('filter', filterBy)
        }

    },
    components: { //specify each dynamic cmps thats created
        newItemModal,
        filterPersonModal,
        taskOptModal,
        groupOptModal
    }
}
</script>
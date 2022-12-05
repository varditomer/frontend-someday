<template>
    <section v-if="showModal" v-click-outside="closeModal" @keydown.escape="closeModal" class='regular-modal'>
        <component @unselectTasks="$emit('unselectTasks')" @updateSelection="updateSelection" :selectedTasks="selectedTasks" :filterBy="filterBy"
            @filter="filter" :is="cmp" @openTask="openTask" :users="users" @removeTask="removeTask" @addGroup="addGroup"
            @removeGroup="removeGroup" :groupId="groupId" @editGroupTitle="editGroupTitle" :color="color"/>
    </section>
</template>

<script>
import taskOptModal from '../option-cmps/task-opt-modal.vue';
import groupOptModal from '../regular-modal-cmps/group-opt-modal.vue';
import newItemModal from '../filter-modals-cmps/new-item-modal.vue';
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue';
import personSelectModal from '../regular-modal-cmps/person-select-modal.vue';
import colorPickerModal from '../regular-modal-cmps/color-picker-modal.vue';
export default {

    name: 'regular-modal',
    emits: ['closeModal', 'openTask', 'removeTask', 'addGroup', 'removeGroup', 'filter', 'editGroupTitle', 'unselectTasks','updateSelection'], //emit all types of dynamic cmps events
    props: {
        showModal: {
            type: Boolean,
            reduired: true,
        },
        cmp: {
            String,
            reduired: true,
        },
        users: {
            Array,
            reduired: true,
        },
        filterBy: {
            type: Object,
            required: false
        },
        groupId: {
            String,
            reduired: true,
        },
        selectedTasks: {
            type: Array,
            require: false
        },
        color: {
            type: String,
            reduired: true,
        },

    },
    computed: {

    },
    created() {
    },
    methods: {
        closeModal() {
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
        removeGroup() {
            this.$emit('removeGroup')
        },
        filter(filterBy) {
            this.$emit('filter', filterBy)
        },
        editGroupTitle() {
            this.$emit('editGroupTitle')
        },
        updateSelection(value){
            this.$emit('updateSelection', value)
        }
    },
    components: { //specify each dynamic cmps thats created
        newItemModal,
        filterPersonModal,
        taskOptModal,
        groupOptModal,
        personSelectModal,
        colorPickerModal
    }
}
</script>
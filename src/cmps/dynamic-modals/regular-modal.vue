<template>
    <section v-if="showModal" v-click-outside="closeModal" @keydown.escape="closeModal" class='regular-modal'>
        <component @updateSelection="updateSelection"
            :selectedTasks="selectedTasks" :filterBy="filterBy" @filter="filter" :is="cmp" @openTask="openTask"
            :users="users" @removeTask="removeTask" @addGroup="addGroup" @removeGroup="removeGroup" :groupId="groupId"
            @editGroupTitle="editGroupTitle" :selectedColor="selectedColor" @propagateMenu="propagateMenu" @deleteMultiple="deleteSelectedTasks" @taskTitleToClipboard="$emit('taskTitleToClipboard')" @linkToClipboard="$emit('linkToClipboard')" />
    </section>
</template>

<script>
import taskOptModal from '../regular-modal-cmps/task-opt-modal.vue';
import groupOptModal from '../regular-modal-cmps/group-opt-modal.vue';
import newItemModal from '../filter-modals-cmps/new-item-modal.vue';
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue';
import taskSelectModal from '../regular-modal-cmps/task-select-modal.vue';
import colorPickerModal from '../regular-modal-cmps/color-picker-modal.vue';
export default {

    name: 'regular-modal',
    emits: ['closeModal', 'openTask', 'removeTask', 'addGroup', 'removeGroup', 'filter', 'editGroupTitle', 'updateSelection', 'propagateMenu','deleteSelectedTasks', 'taskTitleToClipboard', 'linkToClipboard'], //emit all types of dynamic cmps events
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
        selectedColor: {
            type: String,
            reduired: false,
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
        updateSelection(value) {
            this.$emit('updateSelection', { color: value, light: value + '99' }, 'style')
        },
        propagateMenu() {
            this.$emit('propagateMenu')
        },
        deleteSelectedTasks(){
            this.$emit('deleteSelectedTasks')
        }
    },
    components: { //specify each dynamic cmps thats created
        newItemModal,
        filterPersonModal,
        taskOptModal,
        groupOptModal,
        taskSelectModal,
        colorPickerModal
    }
}
</script>
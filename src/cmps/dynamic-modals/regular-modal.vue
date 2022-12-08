<template>
    <section v-if="showModal" @keydown.escape="closeModal" class='regular-modal' v-click-outside="closeModal">
        <component @addColumn="addColumn" :cmpsOrder="cmpsOrder" @updateSelection="updateSelection" :idx="idx"
            :selectedTasks="selectedTasks" :filterBy="filterBy" @filter="filter" :is="cmp" @openTask="openTask"
            :users="users" @removeTask="removeTask" @addGroup="addGroup" @removeGroup="removeGroup" :groupId="groupId"
            @editGroupTitle="editGroupTitle" :selectedColor="selectedColor" @propagateMenu="propagateMenu"
            @deleteMultiple="deleteSelectedTasks" @duplicateMultiple="duplicateSelectedTasks" @taskTitleToClipboard="taskTitleToClipboard"
            @linkToClipboard="linkToClipboard" @duplicateGroup="duplicateGroup" @duplicateTask="duplicateTask"
            :target="target" :colors="colors" :name="name"/>
    </section>
</template>

<script>
import addColumnModal from './add-column-modal.vue'
import taskOptModal from '../regular-modal-cmps/task-opt-modal.vue'
import groupOptModal from '../regular-modal-cmps/group-opt-modal.vue'
import newItemModal from '../filter-modals-cmps/new-item-modal.vue'
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue'
import taskSelectModal from '../regular-modal-cmps/task-select-modal.vue'
import colorPickerModal from '../regular-modal-cmps/color-picker-modal.vue'
import multiFilterModal from '../filter-modals-cmps/multi-filter-modal.vue'
export default {

    name: 'regular-modal',
    emits: ['closeModal', 'openTask', 'removeTask', 'addGroup', 'removeGroup', 'filter', 'editGroupTitle', 'updateSelection', 'propagateMenu', 'deleteSelectedTasks', 'duplicateSelectedTasks', 'taskTitleToClipboard', 'linkToClipboard', 'duplicateGroup', 'duplicateTask', 'addColumn'], //emit all types of dynamic cmps events
    props: {
        showModal: {
            type: Boolean,
            required: true,
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
        colors:{
            type: Object,
            required: false
        },
        target: {
            type: String,
            required: false
        },
        idx: {
            type: Number,
            required: false
        },
        cmpsOrder: {
            type: Array,
            required: false
        },
        name: {
            type: String,
            required: false
        }

    },
    mounted(){
        console.log(`this.colors`, this.colors)
        console.log(`this.name`, this.name)
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
        duplicateTask() {
            this.$emit('duplicateTask')
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
        updateSelection(idx, key, val) {
            this.$emit('updateSelection', idx, key, val)
        },
        propagateMenu() {
            this.$emit('propagateMenu')
        },
        deleteSelectedTasks() {
            this.$emit('deleteSelectedTasks')
        },
        duplicateSelectedTasks() {
            this.$emit('duplicateSelectedTasks')
        },
        taskTitleToClipboard() {
            this.$emit('taskTitleToClipboard')
        },
        linkToClipboard() {
            this.$emit('linkToClipboard')
        },
        duplicateGroup() {
            this.$emit('duplicateGroup')
        },
        addColumn(cmp) {
            this.$emit('addColumn', cmp)
        }
    },
    components: { //specify each dynamic cmps thats created
        newItemModal,
        filterPersonModal,
        taskOptModal,
        groupOptModal,
        taskSelectModal,
        colorPickerModal,
        multiFilterModal,
        addColumnModal
    }
}
</script>
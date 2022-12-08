<template>

    <ul class="task-list">
        <li>
            <section class="static">

                <span class="empty-span"></span>
                <span class="task-select header-task-select" :style="{ 'border-left-color': group.style.color }">
                    <input type="checkbox" @input="toggleSelectAll" v-model="areAllChecked" />
                </span>
                <span class="task-list-item-header">item</span>
            </section>

            <section class="dynamic">
                <draggable v-model="cmpsOrder" itemKey="element" dataIdAttrtag="div" @start="isBeingDragged = true"
                    @end="saveBoard">
                    <template #item="{ element }">
                        <div group="cmps" ghost-class="ghost" :class="{ 'column-dragged': isBeingDragged }"
                            class="titles">
                            {{ element }}
                        </div>
                    </template>
                </draggable>
                <div class="add-columns">
                    <span v-if="!showModal" @click="show" v-svg-icon="'add'" class="add-column-btn"></span>
                    <span v-else @click="(showModal = false)" v-svg-icon="'smallExit'" class="close-column-btn"></span>
                    <regular-modal class="add-columns-modal-parent" @addColumn="addColumn" :cmpsOrder="cmpsOrder" @closeModal="(showModal = false)"
                        v-if="showModal" :cmp="'add-column-modal'" />
                </div>
            </section>

        </li>
        <draggable v-model="group.tasks" ghost-class="ghost" animation="200" @start="beingDragged = true"
            :class="{ 'task-dragged': beingDragged }" @end="saveBoard" itemKey="element._id">
            <template #item="{ element }" :data-id="element.groupId">
                <task-preview @addGroup="addGroup" @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks"
                    :isSelected="selectedTasks.includes(element._id)" @update-task="updateTask" :sort="true"
                    :task="element" :cmpsOrder="cmpsOrder" :users="users" :group="group" :additionalDb="additionalDb"
                    :colors="colors" @removeTask="removeTask" @duplicateTask="duplicateTask" @editing="(editing = true)"
                    @editDone="(editing = false)" :areAllChecked="allCheckedClicked" />
            </template>
        </draggable>
        <li class="add-new-task">
            <section class="static">
                <span class="empty-span"></span>
                <span class="task-select add-task-select" :style="{ 'border-left-color': `${group.style.light}` }">
                    <input type="checkbox" disabled />
                </span>
                <span @click="addTask" v-svg-icon="'add'" class="add-task-icon"></span>
                <input @blur="addTask" v-model="taskToAdd.title" type="text" placeholder="Add Item"
                    class="add-new-task-inline">
                <button style="display:none;"></button>
            </section>
            <section class="dynamic">
                <span v-for="cmp in cmpsOrder" class="empty-fill-span"></span>
            </section>
        </li>
        <task-summary :cmpsOrder="cmpsOrder" :tasks="tasks" class="task-footer" :groupColor="group.style.color"
            :colors="colors" />
    </ul>


</template>
<script>
import regularModal from './dynamic-modals/regular-modal.vue'
import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
import taskSummary from './task-summary.vue'
import { eventBus } from '../services/event-bus.service.js'
export default {
    name: 'task-list',
    emits: ['saveTask', 'removeTask', 'saveSelectedTasks', 'saveBoard', 'addGroup', 'toggleSelectAllTasks', 'duplicateTask', 'addColumn'],
    props: {
        tasks: Array,
        cmpsOrder: Array,
        users: Array,
        group: Object,
        selectedTasks: {
            type: Array,
            required: false
        },
        colors: {
            type: Object,
            reqiured: true
        }
    },
    components: {
        taskPreview,
        draggable,
        taskSummary,
        regularModal
    },
    data() {
        return {
            taskToAdd: {},
            beingDragged: false,
            isBeingDragged: false,
            areAllChecked: false,
            editing: null,
            allChecked: false,
            allCheckedClicked: false,
            showModal: false
        }
    },
    created() {
        this.taskToAdd = {
            groupId: this.group._id,
            boardId: this.group.boardId
        },
            this.editing = false

    },
    mounted() {
        eventBus.on('unselectTasks', () => this.areAllChecked = false)
    },
    methods: {
        addTask() {
            if (!this.taskToAdd.title) return
            this.taskToAdd = {
                ...this.taskToAdd,
                groupId: this.group._id,
                boardId: this.group.boardId
            }
            this.$emit('saveTask', this.taskToAdd)
            this.taskToAdd = {
                groupId: this.group._id,
                boardId: this.group.boardId
            }
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        },
        duplicateTask(task) {
            this.$emit('duplicateTask', task)
        },
        updateTask(task, activity) {
            this.$emit('saveTask', task, activity)
        },
        async saveBoard() {
            this.$emit('saveBoard', this.cmpsOrder)
        },
        saveSelectedTasks(taskId) {
            this.areAllChecked = false
            this.$emit('saveSelectedTasks', taskId)
        },
        toggleSelectAll() {
            this.allCheckedClicked = !this.allCheckedClicked
            this.areAllChecked = !this.areAllChecked
            const formattedTasks = this.group.tasks.map(task => task._id)

            this.$emit('toggleSelectAllTasks', formattedTasks, this.group._id, this.areAllChecked)
        },
        addGroup() {
            this.$emit('addGroup')
        },
        show() {
            this.showModal = true
        },
        addColumn(cmp) {
            this.$emit('addColumn', cmp)
        }
    },
    computed: {

        additionalDb() {
            return {
                users: this.users
            }
        },
        formattedSummary() {

        },
    },
}
</script>
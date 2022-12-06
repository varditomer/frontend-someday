<template>

    <ul class="task-list">
        <li>
            <span class="empty-span"></span>
            <span class="task-select header-task-select" :style="{ 'border-left-color': group.style.color }">
                <input type="checkbox" @input="toggleSelectAll" v-model="areAllChecked" />
            </span>
            <span class="task-list-item-header">item</span>

            <div class="columns">
                <draggable v-model="cmpsOrder" itemKey="element" dataIdAttrtag="div" @start="isBeingDragged = true" @end="saveBoard">
                    <template #item="{ element }">
                        <div group="cmps" ghost-class="ghost" :class="{ columnDragged: isBeingDragged }" class="titles">
                            {{ element }}
                        </div>
                    </template>
                </draggable>
                <span v-svg-icon="'add'" class="add"></span>
            </div>

        </li>
        <draggable v-model="group.tasks" group="tasks" ghost-class="ghost" animation="200" @start="beingDragged = true"
            :class="{ taskDragged: beingDragged }" @end="saveBoard" itemKey="element._id">
            <template #item="{ element }" :data-id="element.groupId">
                <task-preview @addGroup="addGroup" @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks"
                    :isSelected="selectedTasks.includes(element._id)" @update-task="updateTask" :sort="true"
                    :task="element" :cmpsOrder="cmpsOrder" :users="users" :group="group" :additionalDb="additionalDb"
                    @removeTask="removeTask" @duplicateTask="duplicateTask" @editing="(editing = true)" @editDone="(editing = false)" :areAllChecked="allCheckedClicked" />
            </template>
        </draggable>
        <li class="add-new-task">
            <span class="empty-span"></span>
            <span class="task-select add-task-select" :style="{ 'border-left-color': `${group.style.light}` }">
                <input type="checkbox" disabled />
            </span>
            <form @submit.prevent="addTask">
                <span @click="addTask" v-svg-icon="'add'"></span>
                <input @blur="addTask" v-model="taskToAdd.title" type="text" placeholder="Add Item"
                    class="add-new-task-inline">
                <button style="display:none;"></button>
            </form>
            <span v-for="cmp in cmpsOrder" class="empty-fill-span"></span>
            <span class="empty-fill-span"></span>
        </li>
        <task-summary :cmpsOrder="cmpsOrder" :tasks="tasks" class="task-footer" />
    </ul>


</template>
<script>
import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
import taskSummary from './task-summary.vue'
import { eventBus } from '../services/event-bus.service.js'
export default {
    name: 'task-list',
    emits: ['saveTask', 'removeTask', 'saveSelectedTasks', 'saveBoard', 'addGroup', 'toggleSelectAllTasks', 'duplicateTask'],
    props: {
        tasks: Array,
        cmpsOrder: Array,
        users: Array,
        group: Object,
        priorities: {
            type: Array,
            required: true
        },
        statuses: {
            type: Array,
            required: true
        },
        selectedTasks: {
            type: Array,
            required: false
        },
    },
    components: {
        taskPreview,
        draggable,
        taskSummary
    },
    data() {
        return {
            taskToAdd: {},
            beingDragged: false,
            isBeingDragged: false,
            areAllChecked: false,
            editing: null,
            allChecked: false,
            allCheckedClicked: false
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
        async saveBoard(ev) {
            this.$emit('saveBoard', this.cmpsOrder)
        },
        saveSelectedTasks(taskId) {
            this.areAllChecked = false
            this.$emit('saveSelectedTasks', taskId)
        },
        toggleSelectAll() {
            console.log(`12:`, )
            this.allCheckedClicked = !this.allCheckedClicked
            this.areAllChecked = !this.areAllChecked
            const formattedTasks = this.group.tasks.map(task => task._id)

            this.$emit('toggleSelectAllTasks', formattedTasks, this.group._id, this.areAllChecked)
        },
        addGroup() {
            this.$emit('addGroup')
        }
    },
    computed: {

        additionalDb() {
            return {
                priority: this.priorities,
                status: this.statuses,
                users: this.users
            }
        },
        formattedSummary() {

        },
    }
}
</script>
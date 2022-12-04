<template>

    <ul class="task-list">
        <li>
            <span class="empty-span"></span>
            <span class="task-select header-task-select" :style="{ 'border-left-color': group.style.color }">
                <input type="checkbox" />
            </span>
            <span class="task-list-item-header">item</span>

            <!-- <span v-for="(cmp,idx) in cmpOrder" :key="idx" :group="{ name: 'columns' }">
                <draggable :v-model="cmpsOrder[idx]">
                    <template #item="cmp" >cmp</template>
                </draggable>
            </span> -->
            <span v-for="column in cmpsOrder">
                {{ column }}
            </span>

            <span v-svg-icon="'add'"></span>
        </li>
        <draggable v-model="tasks" group="tasks" ghost-class="ghost" animation="200" @start="beingDragged = true"
            :class="{ dragged: beingDragged }" @end="saveBoard" itemKey="element._id">
            <template #item="{ element }" :data-id="element.groupId">
                <task-preview @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks"
                    @update-task="updateTask" :sort="true" :task="element" :cmpsOrder="cmpsOrder" :users="users"
                    :uncheck="uncheck" :group="group" :additionalDb="additionalDb" @removeTask="removeTask" />
            </template>
        </draggable>
        <li class="add-new-task">
            <span class="empty-span"></span>
            <span class="task-select add-task-select" :style="{ 'border-left-color': `${group.style.light}` }">
                <input type="checkbox" />
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
export default {
    name: 'task-list',
    emits: ['saveTask', 'removeTask', 'saveSelectedTasks'],
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
        uncheck: {
            type: Boolean,
            required: false
        }
    },
    components: {
        taskPreview,
        draggable,
        taskSummary
    },
    data() {
        return {
            taskToAdd: {},
            beingDragged: false
        }
    },
    created() {
        this.taskToAdd = {
            groupId: this.group._id,
            boardId: this.group.boardId
        }
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
        updateTask(task) {
            console.log(`task:`, task)
            this.$emit('saveTask', task)
        },
        async saveBoard(ev) {
            this.beingDragged = false
            const group = JSON.parse(JSON.stringify(this.group))
            group.tasks = this.tasks
            console.log(`this.tasks`, this.tasks)
            this.$store.dispatch({ type: 'saveGroup', group })
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
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

        }
    }
}
</script>
<template>

    <ul class="task-list">
        <li>
            <span class="empty-span"></span>
            <span class="task-select header-task-select"><input type="checkbox" /></span>
            <span class="task-list-item-header">item</span>

            <!-- <span v-for="(cmp,idx) in cmpOrder" :key="idx" :group="{ name: 'columns' }">
                <draggable :v-model="cmpsOrder[idx]">
                    <template #item="cmp" >cmp</template>
                </draggable>
            </span> -->

            <!-- <template #item="{element}" :key="element._id">
                    <div>{{element}}</div>
                </template> -->
            <span v-for="column in cmpsOrder">
                {{ column }}
            </span>

            <span v-svg-icon="'add'"></span>
        </li>
        <draggable v-model="tasks" :group="{ name: 'groups' }" animation="150" @end="saveBoard" itemKey="element._id">
            <template #item="{ element }" :data-id="element.groupId">
                <task-preview @update-task="updateTask" :sort="true" :task="element" :cmpsOrder="cmpsOrder"
                    :users="users" :group="group" @removeTask="removeTask" />
            </template>
        </draggable>
        <li class="add-new-task">
            <span class="empty-span"></span>
            <span class="task-select add-task-select"><input type="checkbox" /></span>
            <form @submit.prevent="addTask">
                <span @click="addTask" v-svg-icon="'add'"></span>
                <input @blur="addTask" v-model="taskToAdd.title" type="text" placeholder="Add Item"
                    class="add-new-task-inline">
                <button style="display:none;"></button>
            </form>
            <span v-for="c in cmpsOrder" class="empty-fill-span"></span>
            <span class="empty-fill-span"></span>
        </li>
        <li class="task-footer">
            <span class="empty-span"></span>
            <span class="empty-span"></span>
            <span class="empty-span"></span>
            <span class="empty-span"></span>
            <span class="empty-span"></span>
            <span v-for="cmp in cmpsOrder" class="footer-span"></span>
            <span class="empty-fill-span"></span>
        </li>
    </ul>


</template>
<script>
import draggable from 'vuedraggable'
import taskPreview from './task-preview.vue'
export default {
    name: 'task-list',
    emits: ['saveTask', 'removeTask'],
    props: {
        tasks: Array,
        cmpsOrder: Array,
        users: Array,
        group: Object
    },
    components: {
        taskPreview,
        draggable
    },
    data() {
        return {
            taskToAdd: {}
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
            this.$emit('saveTask', task)
        },
        async saveBoard(ev) {
            const { oldIndex, newIndex } = ev
            // const group = this.$store.getters.groups.find(group => group._id === this.tasks[0].groupId)
            // const originGroupId = ev.item.__draggable_context.element.groupId
            // this.$store.dispatch({ type: 'loadGroups' })
            // const { groupId } = this.tasks[0]
            // const group = JSON.parse(JSON.stringify(this.$store.getters.groups.find(group => group._id === groupId)))
            // group.tasks = this.tasks
            // this.$store.dispatch({ type: 'saveGroup', group })
        }
    }
}
</script>
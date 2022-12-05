<template>

    <section class='group-list-container' v-if="boardCopy" :key="boardUpdated">
        <draggable v-model="boardCopy.groups" group="groups" ghost-class="ghost" animation="220" itemKey="element._id"
            @end="saveBoard" :class="{ groupDragged: beingDragged }">
            <template #item="{ element }">
                <group-preview :uncheck="uncheck" @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks"
                    :group="element" :cmpsOrder="cmpsOrder" :users="users" :key="element._id" :priorities="priorities"
                    :statuses="statuses" @saveTask="saveTask" @removeTask="removeTask" @saveGroup="saveGroup"
                    @saveBoard="saveBoard" @addGroup="addGroup" @removeGroup="removeGroup" />
            </template>
        </draggable>

        <button class="add-group-list-btn flex center" @click="addGroup">
            <span v-svg-icon="'addbig'"></span>
            <div>Add new group</div>
        </button>
    </section>




</template>
<script>
import groupPreview from './group-preview.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../services/event-bus.service'

export default {
    name: 'group-list',
    emits: ['saveTask', 'removeTask', 'saveGroup', 'addGroup', 'removeGroup', 'saveSelectedTasks', 'saveBoard'],
    props: {
        users: Array,
        board: Object,
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
        },
        boardUpdated: Number,
    },
    data() {
        return {
            beingDragged: false,
            boardCopy: false
        }
    },
    mounted() {
        eventBus.on('reload', board => this.boardCopy = JSON.parse(JSON.stringify(board)))
    },
    methods: {
        collapseGroups(collapse, ev) {
            // if (!ev?.item?.classList || !ev.item.classList[0] === 'group-preview') return
            // eventBus.emit('collapse-groups', collapse)
        },
        saveBoard() {
            this.beingDragged = false
            this.$emit('saveBoard', this.boardCopy)
        },
        saveTask(task) {
            this.boardCopy.groups.forEach(group => {
                group.tasks.forEach(task => task.groupId = group._id)
                // if (task.groupId === group._id) group.tasks.push(task)
            })
            this.$emit('saveTask', task)
            this.saveBoard()
        },
        removeTask(task) {
            this.$emit('removeTask', task)
            this.saveBoard()
        },
        saveGroup(group) {
            this.$emit('saveGroup', group)
            this.saveBoard()
        },
        removeGroup(group) {
            this.$emit('removeGroup', group)
            this.saveBoard()
        },
        addGroup() {
            // this.$emit('addGroup')
            this.saveBoard()
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
            this.saveBoard()
        },
    },
    computed: {
        cmpsOrder() {
            return [...this.board.cmpsOrder]
        }
    },
    components: {
        groupPreview,
        draggable
    },
    watch: {
        board: {
            handler(newBoard) {
                this.boardCopy = newBoard
                    ? JSON.parse(JSON.stringify(newBoard))
                    : null
            },
            deep: true
        }
    }
}
</script>
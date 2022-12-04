<template>

    <section class='group-list-container' v-if="boardCopy">
        <draggable v-model="boardCopy.groups" group="groups" ghost-class="ghost" animation="220" itemKey="element._id"
            @end="saveBoard" :class="{ groupDragged: beingDragged }">
            <template #item="{ element }">
                <group-preview :uncheck="uncheck" @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks"
                    :group="element" :cmpsOrder="cmpsOrder" :users="users" :key="element._id" :priorities="priorities"
                    :statuses="statuses" v-if="board" @saveTask="saveTask" @removeTask="removeTask"
                    @saveGroup="saveGroup" @saveBoard="saveBoard" @addGroup="addGroup" @removeGroup="removeGroup" />
            </template>
        </draggable>
    </section>

</template>
<script>
import groupPreview from './group-preview.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../services/event-bus.service'

export default {
    name: 'group-list',
    emits: ['saveTask', 'removeTask', 'saveGroup', 'removeGroup', 'saveSelectedTasks', 'saveBoard'],
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
        }
    },
    data() {
        return {
            beingDragged: false,
            boardCopy: false
        }
    },
    methods: {
        minimizeGroups(minimize, ev) {
            // if (!ev?.item?.classList || !ev.item.classList[0] === 'group-preview') return
            // eventBus.emit('minimized-groups', minimize)
        },
        saveBoard() {
            this.beingDragged = false
            this.$emit('saveBoard', this.boardCopy)
        },
        saveTask(task) {
            const board = this.boardCopy
            board.groups.forEach(group => group.tasks.forEach(task => task.groupId = group._id))
            this.boardCopy = board
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
            console.log(`add group - group list:`,)
            this.$emit('addGroup')
            this.saveBoard()
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
            this.saveBoard()
        },
    },
    computed: {
        groups() {
            return JSON.parse(JSON.stringify(this.board.groups))
        },
        cmpsOrder() {
            return [...this.board.cmpsOrder]
        }
    },
    components: {
        groupPreview,
        draggable
    },
    watch: {
        board: function (newBoard) {
            this.boardCopy = newBoard
                ? JSON.parse(JSON.stringify(newBoard))
                : null
        }
    }
}
</script>
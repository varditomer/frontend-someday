<template>

    <section class='group-list-container' v-if="boardToShow" @scroll="scrolling">
        <draggable v-model="boardToShow.groups" group="groups" ghost-class="ghost" animation="220" itemKey="element._id"
            @end="saveBoard" :class="{ groupDragged: beingDragged }">
            <template #item="{ element }">
                <group-preview :isHorizontalScrolling="isHorizontalScrolling" @saveSelectedTasks="saveSelectedTasks"
                    :selectedTasks="selectedTasks" :group="element" :cmpsOrder="cmpsOrder" :users="users"
                    :key="element._id" :priorities="priorities" @toggleSelectAllTasks="toggleSelectAllTasks"
                    :statuses="statuses" @saveTask="saveTask" @removeTask="removeTask" @saveGroup="saveGroup"
                    @saveBoard="saveBoard" @addGroup="addGroup" @removeGroup="removeGroup" />
            </template>
        </draggable>

        <button class="add-group-list-btn flex center" @click="addGroup(false)">
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
    emits: ['saveTask', 'removeTask', 'saveGroup', 'addGroup', 'removeGroup', 'saveSelectedTasks', 'saveBoard', 'select', 'toggleSelectAllTasks', 'duplicateGroup'],
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
    },
    data() {
        return {
            beingDragged: false,
            isHorizontalScrolling: null,
            // pageX: null
        }
    },
    mounted() {
        eventBus.on('reload', board => this.boardToShow = JSON.parse(JSON.stringify(board)))
    },
    methods: {
        saveBoard() {
            this.beingDragged = false
            this.$emit('saveBoard', this.boardToShow)
        },
        saveTask(task) {
            this.boardToShow.groups.forEach(group => {
                group.tasks.forEach(task => task.groupId = group._id)
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
        addGroup(isFifo = true) {
            this.$emit('addGroup', isFifo)
            this.saveBoard()
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
            this.saveBoard()
        },
        scrolling(event) {
            const { scrollLeft } = event.target
            return this.isHorizontalScrolling = scrollLeft ? true : false
        },
        toggleSelectAllTasks(tasks, groupId, areAllSelected) {
            this.$emit('toggleSelectAllTasks', tasks, groupId, areAllSelected)
        },
        duplicateGroup(group) {
            this.$emit('duplicateGroup', group)
        }
    },
    computed: {
        cmpsOrder() {
            return [...this.board.cmpsOrder]
        },
        boardToShow() {
            return JSON.parse(JSON.stringify(this.board))
        },

    },
    components: {
        groupPreview,
        draggable
    },
    created() {
        this.isHorizontalScrolling = false
    }
}
</script>
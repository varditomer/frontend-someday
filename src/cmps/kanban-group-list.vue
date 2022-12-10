<template>

    <section class=''>
        <draggable v-if="kanbanBoard?.groups?.length" v-model="kanbanBoard.groups" animation="220"
            itemKey="element.title" :class="{ 'group-dragged': beingDragged }" class="kanban-group-list-container"
            @end="saveBoard">
            <template #item="{ element }">
                <section class="group-preview" :style="getBorder(element)">
                    <div class="group-title" :style="getColor(element)">
                        <h1>{{ element.title }}</h1>
                    </div>
                    <group-preview :group="element" :tasks="element.tasks" @saveTasks="saveGroup" />
                </section>
            </template>
        </draggable>

    </section>

</template>
<script>
import draggable from 'vuedraggable'
import taskList from './kanban-task-list.vue'
import groupPreview from './kanban-group-preview.vue'

// import triangleModal from './dynamic-modals/triangle-modal.vue'
export default {
    name: 'kanban-group-list',
    props: {
        kanbanBoard: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false,
            beingDragged: false,
            boardToShow: [],

        }
    },
    computed: {
        users() { return this.$store.getters.users },
    },
    methods: {
        updateTask(personsObj) {
            this.$emit('updateTask', personsObj)
        },
        hide() {
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        },
        getColor(label) {
            return `background-color:${label.color}; `
        },
        getBorder(label) {
            return `border-left: ${label.color} 4px solid;`
        },
        saveGroup(groupId, tasks) {
            const board = JSON.parse(JSON.stringify(this.kanbanBoard))
            const groupIdx = this.kanbanBoard.groups.findIndex(group => group._id === groupId)
            board.groups[groupIdx].tasks = tasks
            // this.saveBoard(board)
            // const taskIdOrder = tasks.map(task => task._id)
            // if (!board.taskIdOrder) board.taskIdOrder = {}
            // if (!board.taskIdOrder[board.kanbanType]) board.taskIdOrder[board.kanbanType] = {}
            // board.taskIdOrder[board.kanbanType][groupId] = taskIdOrder
            // const { kanbanOrder } = board
            // this.saveBoard({ kanbanOrder, taskIdOrder })
        },
        saveBoard(board) {
            // this.$store.dispatch({type:'saveKanbanBoard'})
            // let board = JSON.parse(JSON.stringify(this.$store.getters.board))
            // board = { ...board, ...updatedProps }
            // this.$store.dispatch({ type: 'saveBoard', board })
            // board1.kanbanOrder = this.statuses //.map(status => status._id)

            // this.$store.dispatch({ type: 'saveBoard', board: board1 })
            // console.log(this.labeles)
        },
    },
    async created() {
    },
    components: {
        taskList,
        groupPreview,
        draggable,
        // triangleModal
    }
}
</script>

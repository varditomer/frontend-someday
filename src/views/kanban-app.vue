<template>
    <section class="main-app-container" :class="{ 'folded': isWorkspaceCollapsed }">
        <task-nav />
        <board-workspace @addBoard="addBoard" @toggleWorkspace="toggleWorkspace"
            :isWorkspaceCollapsed="isWorkspaceCollapsed" />

        <section class='board-app-container' :class="{ 'folded': isViewingTask }">
            <regular-modal v-if="false" :cmp="'task-select-modal'" />
            <board-header @saveBoardTitle="saveBoardTitle" :filterBy="filterBy" :users="users" @addTask="saveEmptyTask"
                @addGroup="addGroup" @filter="setFilter" />
            <kanban-group-list />
            <!-- <group-list :users="users" @saveTask="saveTask" @removeTask="removeTask" @duplicateTask="duplicateTask"
                @saveGroup="saveGroup" @addGroup="addGroup" @saveBoard="saveBoard" @removeGroup="removeGroup"
                :board="board" :priorities="priorities" :statuses="statuses" :colors="colors" /> -->
        </section>

        <router-view />
    </section>
</template>
<script>
import regularModal from '../cmps/dynamic-modals/regular-modal.vue'
import boardHeader from '../cmps/board-header.vue'
import kanbanGroupList from '../cmps/kanban-group-list.vue'
import boardWorkspace from '../cmps/board-workspace.vue'
import taskNav from '../cmps/task-nav.vue'

export default {
    name: 'kanban-app',
    components: {
        boardHeader,
        kanbanGroupList,
        boardWorkspace,
        taskNav,
        regularModal
    },
    data() {
        return {
            boardUpdated: 0,
        }
    },
    methods: {
        saveTask(task, activity) {
            const taskToSave = { task, bool: false }
            this.$store.commit({ type: 'saveTask', taskToSave })
            this.$store.dispatch({ type: 'saveActivity', activity })
            this.$store.dispatch({ type: 'saveTask', task })
        },
        saveBoard(board) {
            this.$store.commit({ type: 'setBoard', board })
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        removeTask(task) {
            this.$store.dispatch({ type: 'removeTask', task })
        },
        async duplicateTask(task) {
            await this.$store.dispatch({ type: 'duplicateTask', task })
        },
        async saveEmptyTask() {
            await this.$store.dispatch({ type: 'saveEmptyTask' })
        },
        addBoard() {
            this.$store.dispatch({ type: 'addBoard' })
        },
        saveGroup(group) {
            this.$store.dispatch({ type: 'saveGroup', group })
        },
        removeGroup(group) {
            this.$store.dispatch({ type: 'removeGroup', group })
        },
        addGroup(isFifo = true) {
            this.$store.dispatch({ type: 'addGroup', isFifo })
        },
        duplicateGroup(group) {
            this.$store.dispatch({ type: 'duplicateGroup', group })
        },
        setFilter(filter) {
            if (filter.userId && this.filterBy?.userId) {
                if (filter.userId === this.filterBy.userId) filter.userId = null
            }
            this.$store.dispatch({ type: 'queryBoard', id: this.board._id, filter })
        },
        toggleWorkspace() {
            this.$store.commit({ type: 'toggleWorkspace' })
        },
        scroll(isScrolling) {
            this.$store.commit({ type: 'setIsScrolling', isScrolling })
        },
        async saveSelectedTasks(taskId) {
            await this.$store.commit({ type: 'saveSelectedTasks', taskId })
            const idx = this.selectedTasksWithColor.findIndex(anyTask => anyTask.taskId === taskId)
            if (idx === -1) {
                const formattedTaskId = this.getSelectedTasksColors([taskId])
                this.selectedTasksWithColor.push(formattedTaskId[0])
            } else this.selectedTasksWithColor.splice(idx, 1)
        },
        async saveBoardTitle(title) {
            const board = JSON.parse(JSON.stringify(this.board))
            if (board.title === title) return
            board.title = title
            await this.$store.dispatch({ type: 'saveBoard', board })
            this.$store.dispatch({ type: 'loadMiniBoards' })
        },
    },
    computed: {
        users() {
            return this.$store.getters.users
        },
        route() {
            return this.$route.params.id
        },
        board() {
            console.log(`this.$store.getters.board`, this.$store.getters.board)
            return this.$store.getters.board
        },
        isWorkspaceCollapsed() {
            return this.$store.getters.isWorkspaceCollapsed
        },
        filterBy() {
            return this.$store.getters.filterBy
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        isViewingTask() {
            return typeof (this.$route.params.taskId) === 'string'
        },
        dataMap() {
            return this.$store.getters.filterMap
        },
        colors() {
            return this.$store.getters.colors
        }

    },
    async created() {
        const { id } = this.$route.params
        try {
            await this.$store.dispatch({ type: 'queryBoard', filter: { id } })
            this.$store.commit({ type: 'queryKanbanBoard', sort: 'status'})
        } catch (err) {
            this.$router.push('/')
        }
    }
}


</script>


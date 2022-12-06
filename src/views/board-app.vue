<template>
    <section class="main-app-container" :class="{ 'folded': isWorkspaceCollapsed }" @scroll.x="scrolling">
        <task-nav />
        <board-workspace @addBoard="addBoard" @toggleWorkspace="toggleWorkspace"
            :isWorkspaceCollapsed="isWorkspaceCollapsed" />
        <section class='board-app-container'>
            <regular-modal :selectedTasks="selectedTasks" @deleteSelectedTasks="deleteSelectedTasks"
                :showModal="showModal" :cmp="'task-select-modal'" />
            <board-header @saveBoardTitle="saveBoardTitle" :filterBy="filterBy" :users="users" @addTask="saveEmptyTask"
                @addGroup="addGroup" @filter="setFilter" />
            <group-list @saveSelectedTasks="saveSelectedTasks" @toggleSelectAllTasks="toggleSelectAllTasks"
                :selectedTasks="selectedTasks" :users="users" @saveTask="saveTask" @removeTask="removeTask" @duplicateTask="duplicateTask"
                @saveGroup="saveGroup" @addGroup="addGroup" @saveBoard="saveBoard" @removeGroup="removeGroup"
                @duplicateGroup="duplicateGroup" :board="board" :priorities="priorities" :statuses="statuses" />
        </section>
        <router-view />
    </section>
</template>
<script>
import regularModal from '../cmps/dynamic-modals/regular-modal.vue'
import boardHeader from '../cmps/board-header.vue'
import groupList from '../cmps/group-list.vue'
import boardWorkspace from '../cmps/board-workspace.vue'
import taskNav from '../cmps/task-nav.vue'
import { eventBus } from '../services/event-bus.service.js'

export default {
    name: 'board-app',
    components: {
        boardHeader,
        groupList,
        boardWorkspace,
        taskNav,
        regularModal
    },
    data() {
        return {
            boardUpdated: 0,
            scrollX: null
        }
    },
    mounted() {
        eventBus.on('unselectTasks', () => this.unselectTasks())
    },
    unmounted() {

    },
    methods: {
        saveTask(task, activity) {
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
        duplicateTask(task) {
            this.$store.dispatch({ type: 'duplicateTask', task })
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
        async saveSelectedTasks(taskId) {
            await this.$store.commit({ type: 'saveSelectedTasks', taskId })
        },
        async deleteSelectedTasks() {
            try {
                await this.$store.dispatch({ type: 'removeTasks' })
                this.unselectTasks()
            } catch (err) {
                console.log(`Cannot delete selected tasks`, err)
            }
        },
        unselectTasks() {
            this.$store.commit({ type: 'unselectTasks' })
        },
        async saveBoardTitle(title) {
            const board = JSON.parse(JSON.stringify(this.board))
            if (board.title === title) return
            board.title = title
            await this.$store.dispatch({ type: 'saveBoard', board })
            this.$store.dispatch({ type: 'loadMiniBoards' })
        },
        toggleSelectAllTasks(tasks, groupId, areAllSelected) {
            this.$store.commit({ type: 'toggleSelectAllTasks', tasks, groupId, areAllSelected })
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
            return this.$store.getters.board
        },
        priorities() {
            return this.$store.getters.priorities
        },
        statuses() {
            return this.$store.getters.statuses
        },
        isWorkspaceCollapsed() {
            return this.$store.getters.isWorkspaceCollapsed
        },
        filterBy() {
            return this.$store.getters.filterBy
        },
        selectedTasks() {
            return this.$store.getters.selectedTasks
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        showModal() {
            return this.$store.getters.selectedTasks?.length
                ? true
                : false
        }
    },
    data() {
        return {
        }
    },
    async created() {
        const { id } = this.$route.params
        try {
            await this.$store.dispatch({ type: 'queryBoard', id })
        } catch (err) {
            this.$router.push('/')
        }
    }
}


</script>


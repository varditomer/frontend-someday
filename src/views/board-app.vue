<template>
    <section class="main-app-container" :class="{ 'folded': isWorkspaceClosed }">
        <task-nav />
        <board-workspace @addBoard="addBoard" @toggleWorkspace="toggleWorkspace"
            :isWorkspaceClosed="isWorkspaceClosed" />
        <section class='board-app-container'>
            <regular-modal @unselectTasks="unselectTasks" :selectedTasks="selectedTasks" :showModal="showModal"
                :cmp="'person-select-modal'" />
            <board-header @saveBoardTitle="saveBoardTitle" :filterBy="filterBy" :users="users" @addTask="saveEmptyTask"
                @addGroup="addGroup" @filter="setFilter" />
            <group-list @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks" :users="users"
                @saveTask="saveTask" @removeTask="removeTask" @saveGroup="saveGroup" @addGroup="addGroup"
                @removeGroup="removeGroup" :board="board" :priorities="priorities" :statuses="statuses" />
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

export default {
    name: 'board-app',
    components: {
        boardHeader,
        groupList,
        boardWorkspace,
        taskNav,
        regularModal
    },
    methods: {
        saveTask(task) {
            this.$store.dispatch({ type: 'saveTask', task })
        },
        removeTask(task) {
            this.$store.dispatch({ type: 'removeTask', task })
        },
        saveEmptyTask() {
            this.$store.dispatch({ type: 'saveEmptyTask' })
        },
        addBoard() {
            this.$store.dispatch({ type: 'addBoard' })
        },
        addGroup() {
            this.$store.dispatch({ type: 'addGroup' })
        },
        setFilter(filter) {
            this.$store.dispatch({ type: 'queryBoard', id: this.board._id, filter })
        },
        saveGroup(group) {
            this.$store.dispatch({ type: 'saveGroup', group })
        },
        removeGroup(group) {
            this.$store.dispatch({ type: 'removeGroup', group })
        },
        toggleWorkspace() {
            this.$store.commit({ type: 'toggleWorkspace' })
        },
        async saveSelectedTasks(taskId) {
            await this.$store.commit({ type: 'saveSelectedTasks', taskId })
            this.showModal = (this.selectedTasks.length) ? true : false
        },
        unselectTasks() {
            this.$store.commit({ type: 'unselectTasks' })
            this.showModal = false
        },
        async saveBoardTitle(title) {
            const board = JSON.parse(JSON.stringify(this.board))
            if (board.title === title) return
            board.title = title
            await this.$store.dispatch({ type: 'saveBoard', board })
            this.$store.dispatch({ type: 'loadMiniBoards' })
        }
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
        isWorkspaceClosed() {
            return this.$store.getters.isWorkspaceClosed
        },
        filterBy() {
            return this.$store.getters.filterBy
        },
        selectedTasks() {
            return this.$store.getters.selectedTasks
        },
    },
    data() {
        return {
            showModal: false
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


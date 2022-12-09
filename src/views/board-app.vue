<template>
    <section class="main-app-container" :class="{ 'folded': isWorkspaceCollapsed }">
        <task-nav />
        <board-workspace @addBoard="addBoard" @toggleWorkspace="toggleWorkspace"
            :isWorkspaceCollapsed="isWorkspaceCollapsed" />

        <section class='board-app-container' :class="{ 'folded': isViewingTask }">
            <regular-modal class="task-select-modal-parent" :selectedTasks="selectedTasksWithColor"
                @deleteSelectedTasks="deleteSelectedTasks" @duplicateSelectedTasks="duplicateSelectedTasks"
                v-if="showModal" :cmp="'task-select-modal'" />
            <board-header @saveBoardTitle="saveBoardTitle" :filterBy="filterBy" :users="users" @addTask="saveEmptyTask"
                @addGroup="addGroup" @filter="setFilter" />
            <group-list @saveSelectedTasks="saveSelectedTasks" @toggleSelectAllTasks="toggleSelectAllTasks"
                :selectedTasks="selectedTasks" :users="users" @saveTask="saveTask" @removeTask="removeTask"
                @duplicateTask="duplicateTask" @saveGroup="saveGroup" @addGroup="addGroup" @saveBoard="saveBoard"
                @removeGroup="removeGroup" @duplicateGroup="duplicateGroup" :board="board" :colors="colors" />
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
import { colors } from '../services/color.service.js'
import { socketService } from '../services/socket.service'
// import { boardService } from '../services/board.service.local.js'

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
            scrollX: null,
            selectedTasksWithColor: []
        }
    },
    mounted() {
        eventBus.on('unselectTasks', () => this.unselectTasks())
    },
    unmounted() {

    },
    methods: {
        saveTask(task, activity) {

            const taskToSave = { task, isFifo: true }
            // this.$store.commit({ type: 'saveTask', taskToSave })
            // this.$store.dispatch({ type: 'saveActivity', activity })
            this.$store.dispatch({ type: 'saveTask', taskToSave })
        },
        saveBoard(board) {
            this.$store.commit({ type: 'setBoard', boardData: { board } })
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        removeTask(task) {
            this.$store.dispatch({ type: 'removeTask', task })
            const idx = this.selectedTasksWithColor?.findIndex(taskWithColor => taskWithColor.taskId === task._id)
            if (idx !== -1) this.selectedTasksWithColor.splice(idx, 1)
        },
        async duplicateTask(task) {
            await this.$store.dispatch({ type: 'duplicateTask', task })
        },
        async saveEmptyTask() {
            const task = {
                groupId: this.board.groups[0]._id,
                boardId: this.board._id,
                title: 'Item 1'
            }
            const taskToSave = { task, isFifo: false }
            // this.$store.commit({ type: 'saveTask', taskToSave })
            this.$store.dispatch({ type: 'saveTask', taskToSave })
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
            console.log(filter);
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
        async deleteSelectedTasks() {
            try {
                await this.$store.dispatch({ type: 'removeTasks' })
                this.unselectTasks()
            } catch (err) {
                console.log(`Cannot delete selected tasks`, err)
            }
        },
        async duplicateSelectedTasks() {
            const allSelectedTasksIds = this.$store.getters.selectedTasks
            const tasks = []
            allSelectedTasksIds.forEach((selectedTaskId, idx) => {
                this.board.groups.forEach(group => {
                    group.tasks.forEach(task => {
                        if (task._id === selectedTaskId) return tasks.push(task)
                    })
                })
            })
            await this.$store.dispatch({ type: 'duplicateMultipleTasks', tasks })
        },
        async unselectTasks() {
            await this.$store.commit({ type: 'unselectTasks' })
            const allSelectedTasksIds = this.$store.getters.selectedTasks
            if (allSelectedTasksIds) {
                if (allSelectedTasksIds.length > 1) this.selectedTasksWithColor = this.getSelectedTasksColors(allSelectedTasksIds)
                else this.selectedTasksWithColor = this.getSelectedTasksColors([allSelectedTasksIds])
            } else return
        },
        async saveBoardTitle(title) {
            const board = JSON.parse(JSON.stringify(this.board))
            if (board.title === title) return
            board.title = title
            await this.$store.dispatch({ type: 'saveBoard', board })
        },
        toggleSelectAllTasks(tasks, groupId, areAllSelected) {
            this.$store.commit({ type: 'toggleSelectAllTasks', tasks, groupId, areAllSelected })
            this.selectedTasksWithColor = []
            const allSelectedTasksIds = this.$store.getters.selectedTasks
            return this.selectedTasksWithColor = this.getSelectedTasksColors(allSelectedTasksIds)
        },

        getSelectedTasksColors(selectedTasksIds) {
            const { groups } = this.board
            const idsCopy = [...selectedTasksIds]
            const formattedTaskId = groups.reduce((formattedIds, group) => {
                const temp = group.tasks.reduce((relevantTaskIds, task) => {
                    const idx = idsCopy.indexOf(task._id)
                    if (idx !== -1) {
                        relevantTaskIds.push({
                            taskId: idsCopy.splice(idx, 1)[0],
                            color: group.style.color
                        })
                    }
                    return relevantTaskIds
                }, [])
                if (temp && temp.length) formattedIds.push(...temp)
                return formattedIds
            }, [])
            return formattedTaskId
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
            return this.$store.getters.filteredBoard
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
        } catch (err) {
            this.$router.push('/')
        }
    }
}


</script>


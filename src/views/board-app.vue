<template>
    <section class="main-app-container">
        <task-nav />
        <board-workspace @addBoard="addBoard" />
        <section class='board-app-container'>
            <board-header @addTask="saveEmptyTask" @addGroup="addGroup" @filter="setFilter" />
            <group-list :users="users" @saveTask="saveTask" @removeTask="removeTask" :board="board" />
        </section>
        <router-view />
    </section>
</template>
<script>
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
        taskNav
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


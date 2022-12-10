<template>
    <section class='board-header'>
        <section class="header">
            <section class="top-header">
                <h1 :class="{ 'editing': isEditing }" @keydown.enter.prevent="saveBoardTitle" @blur="saveBoardTitle"
                    contenteditable @click="isEditing = true" class="board-title">
                    {{ boardTitle }}</h1>
                <span v-svg-icon="'more'"></span>
            </section>
            <section class="add-views">
                <router-link :to="('/board/' + board._id)">
                    <button @click="changeView('table')" class="view-item" :class="{ 'selected': view === 'table' }">
                        <span v-svg-icon="'outlineHome'"></span>
                        <p class="view-title">Main Table</p>
                    </button>
                </router-link>
                <span class="separator">|</span>
                <router-link :to="('/board/' + board._id + '/kanban/')">
                    <button @click="changeView('kanban')" class="view-item" :class="{ 'selected': view === 'kanban' }">
                        <p class="view-title">Kanban</p>
                    </button>
                </router-link>
                <span class="separator">|</span>
                <router-link :to="('/board/' + board._id + '/dashboard/')">
                    <button @click="changeView('dashboard')" class="view-item"
                        :class="{ 'selected': view === 'dashboard' }">
                        <p class="view-title">Dashboard</p>
                    </button>
                </router-link>
            </section>
        </section>
        <board-filter :filterBy="filterBy" :users="users" @filter="setFilter" @addTask="addTask" @addGroup="addGroup" />
    </section>

</template>
<script>
import boardFilter from './board-filter.vue'
export default {
    name: 'board-header',
    emits: ['filter', 'addTask', 'addGroup', 'saveBoardTitle'],
    props: {
        users: Array,
        filterBy: Object
    },
    data() {
        return {
            isEditing: false,
            view: ''
        }
    },
    methods: {
        changeView(viewName) {
            this.view = viewName
        },

        addGroup() {
            this.$emit('addGroup')
        },
        setFilter(filter) {
            this.$emit('filter', filter)
        },
        saveBoardTitle(ev) {
            this.isEditing = false
            ev.target.blur()
            const val = ev.target.innerText
            this.$emit('saveBoardTitle', val)
        },
        addTask() {
            this.$emit('addTask')
        }
    },
    components: {
        boardFilter,
    },
    computed: {
        boardTitle() { return this.$store.getters.board.title },
        board() { return this.$store.getters.board }
    },
    created() {
        const path = this.$route.path
        if (path.includes('kanban')) this.view = 'kanban'
        else if (path.includes('dashboard')) this.view = 'dashboard'
        else this.view = 'table'
    }

}
</script>
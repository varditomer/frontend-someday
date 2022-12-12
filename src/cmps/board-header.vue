<template>
    <section class='board-header'>
        <section class="header">
            <section class="top-header">
                <h1 :class="{ 'editing': isEditing }" @keydown.enter.prevent="saveBoardTitle" @blur="saveBoardTitle"
                    contenteditable @click="isEditing = true" class="board-title">
                    {{ boardTitle }}</h1>
                <div  class="board-title-right-container">
                    <div v-if="userImg" class="last-seen">Last seen <img :src="userImg" alt=""></div>
                    <div class="invite">
                        <span v-svg-icon="'inviteMember'"></span>
                        Invite
                        <a :href="getBoardUrl" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
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
        <board-filter :filter="filter" :users="users" @setFilter="setFilter" @addTask="addTask" @addGroup="addGroup" />
    </section>

</template>
<script>
import boardFilter from './board-filter.vue'
import { socketService } from '../services/socket.service'
export default {
    name: 'board-header',
    emits: ['setFilter', 'addTask', 'addGroup', 'saveBoardTitle'],
    props: {
        users: Array,
        filter: Object
    },
    data() {
        return {
            isEditing: false,
            view: '',
            userImg: '',
            lastSeenUserId: ''
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
            this.$emit('setFilter', filter)
        },
        saveBoardTitle(ev) {
            this.isEditing = false
            ev.target.blur()
            const val = ev.target.innerText
            this.$emit('saveBoardTitle', val)
        },
        addTask() {
            this.$emit('addTask')
        },
        setLastSeenUser(userId) {
            setTimeout(() => {
                console.log(`userId:`, userId)
                const users = this.getUsers

            }, 2000)
        },

    },
    components: {
        boardFilter,
    },
    computed: {
        boardTitle() { return this.$store.getters.board.title },
        board() { return this.$store.getters.board },
        getUsers() { return this.$store.getters.users },
        getUserImg() { return this.userImg },
        getLoggedinUser() {return this.$store.getLoggedinUser},
        getBoardUrl() {
            console.log(`getLoggedinUser():`, this.getLoggedinUser)
            return `https://mail.google.com/mail/u/0/?view=cm&fs=1&su=Hey! come join my someday board &body=You can find it on this link: http:/${this.$route.fullPath}.com`
        }
    },
    created() {
        const path = this.$route.path
        if (path.includes('kanban')) this.view = 'kanban'
        else if (path.includes('dashboard')) this.view = 'dashboard'
        else this.view = 'table'
        socketService.on('user-connected', (userId) => {
            const users = this.getUsers
            console.log(`userId:`, userId)
            this.lastSeenUserId = userId
            this.userImg = users.find(user => user._id === userId).imgUrl
            console.log(`this.lastSeenUserId:`, this.lastSeenUserId)
        })
    },
    mounted() {

    }

}
</script>
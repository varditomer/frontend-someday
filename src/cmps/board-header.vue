<template>

    <section class='board-header'>
        <section class="header">
            <section class="top-header">
                <h1 :class="{ 'editing': isEditing }" @keydown.enter.prevent="saveBoardTitle" @blur="saveBoardTitle"
                    contenteditable @click="isEditing = true" class="board-title">
                    {{ boardTitle }}</h1>
                <div class="board-title-right-container">
                    <div v-if="getlastSeenUserImg" class="last-seen">Last seen <img :src="getlastSeenUserImg" alt="">
                    </div>
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
            <!-- <select class="add-views-mobile hide">
                <option>Main table</option>
                <option>Kanban</option>
                <option>Dashboard</option>
            </select> -->
            <div class="add-views-mobile hide">

                <button></button>

                <div class="options">
                    <input id="radio-africa" type="radio" name="region" value="africa" checked>
                    <label style="--index: 1" for="radio-africa">Main table</label>

                    <input id="radio-asia" type="radio" name="region" value="asia">
                    <label style="--index: 2" for="radio-asia">Kanban</label>

                    <input id="radio-australia" type="radio" name="region" value="australia">
                    <label style="--index: 3" for="radio-australia">Dashboard</label>
                </div>

                <svg viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                </svg>

            </div>
            <board-filter v-if="vw<500" :filter="filter" :users="users" @setFilter="setFilter" @addTask="addTask" @addGroup="addGroup" />
        </section>
        <board-filter v-if="vw>500" :filter="filter" :users="users" @setFilter="setFilter" @addTask="addTask" @addGroup="addGroup" />
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
            lastSeenUserImg: '',
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
        setLastSeenUserImg(userId = '') {
            const users = this.getUsers
            this.lastSeenUserId = userId
            console.log(`userId:`, userId)
            const user = users?.find(user => user._id === userId)
            this.lastSeenUserImg = user?.imgUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        }

    },
    components: {
        boardFilter,
    },
    computed: {
        boardTitle() { return this.$store.getters.board.title },
        board() { return this.$store.getters.board },
        getUsers() { return this.$store.getters.users },
        getlastSeenUserImg() { return this.lastSeenUserImg ? this.lastSeenUserImg : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' },
        loggedinUser() { return this.$store.getters.loggedinUser },
        getBoardUrl() {
            return `https://mail.google.com/mail/u/0/?view=cm&fs=1&su=Hey! come join my someday board &body=You can find it on this link: http://somdey.onrender.com${this.$route.fullPath}.com`
        },
        vw() {
            return window.innerWidth
        }
    },
    created() {
        console.log(`created:`,)
        const path = this.$route.path
        if (path.includes('kanban')) this.view = 'kanban'
        else if (path.includes('dashboard')) this.view = 'dashboard'
        else this.view = 'table'

        this.setLastSeenUserImg(this.loggedinUser?._id)

    },
    mounted() {
        console.log(`mounted:`,)
        socketService.on('user-connected', (userId) => {
            this.setLastSeenUserImg(userId)
        })

    }

}
</script>
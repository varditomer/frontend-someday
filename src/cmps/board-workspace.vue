<template>
    <aside class="workspace-container">

        <div class="workspace-header flex column">

            <div class="workspace-main-header flex justify-between">
                <div class="workspace-dropdown-container flex align-center">
                    <div class="workspace-indicator-container flex center">
                        <span>M</span>
                        <div class="work-space-icon">
                            <span v-svg-icon="'home'"></span>
                        </div>
                    </div>
                    <div class="workspace-title">Main workspace</div>
                </div>
                <span v-svg-icon="'more'" class="more"></span>
            </div>

            <div class="workspace-sub-header flex align-center">
                <div class="search-container flex align-center">
                    <span v-svg-icon="'search'"></span>
                    <input type="text" @input="setFilter" placeholder="Search">
                </div>
                <button class="flex center" @click="addBoard" title="Add new Board">
                    <span v-svg-icon="'add'"></span>
                </button>
            </div>
        </div>

        <section class="boards-titles-container">
            <div class="boards-titles flex" v-if="miniBoards" v-for="miniBoard in miniBoardsToShow"
                :key="miniBoard._id">
                <router-link :to="('/board/' + miniBoard._id)">
                    <span v-svg-icon="'board'"></span>
                    <p class="board-title">{{ miniBoard.title }}</p>
                </router-link>
            </div>
        </section>


    </aside>
</template>

<script>

export default {
    name: 'board-workspace',
    data() {
        return {
            filter: ''
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadMiniBoards' })
    },
    computed: {
        miniBoardsToShow() {
            const miniBoards = this.$store.getters.miniBoards
            if (!this.filter) return miniBoards
            const regex = new RegExp(this.filter, 'i')
            return miniBoards.filter(board => regex.test(board.title))
        },
        miniBoards() {
            return this.$store.getters.miniBoards
        },
    },
    methods: {
        setFilter(event) {
            const filter = event.target.value
            this.filter = filter
        },
        addBoard() {
            this.$store.dispatch({ type: 'addBoard' })
        }
    },

}
</script>

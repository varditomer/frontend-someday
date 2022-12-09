<template>
    <aside class="workspace-container" :class="{ 'collapsed': isWorkspaceCollapsed }">

        <div @click="toggleWorkspace" class="toggle-workspace-div">
            <span class="toggle-workspace" v-if="!isWorkspaceCollapsed" v-svg-icon="'arrowLeft'"></span>
            <span class="toggle-workspace" v-else v-svg-icon="'arrowRight'"></span>
        </div>

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
            </div>

            <div class="workspace-sub-header flex align-center">
                <div @click="(isSearchClicked = true)" :class="{ 'input-open': isSearchClicked }"
                    class="search-container flex align-center">
                    <span v-svg-icon="'search'"></span>
                    <input @blur="(isSearchClicked = false)" type="text" @input="setFilter" placeholder="Search" />
                </div>
                <button @click="addBoard" @mouseover="(showTitle = true)" @mouseout="(showTitle = false)"
                    class="add-board-btn flex center">
                    <span v-svg-icon="'outlinePlus'"></span>
                </button>
            </div>
        </div>

        <section class="boards-titles-container">
            <div class="boards-titles" v-if="miniBoards" v-for="miniBoard in miniBoardsToShow" :key="miniBoard._id"
                :class="{ 'selected-board': (miniBoard._id===$route.params.id)}">
                <router-link :to="('/board/' + miniBoard._id)">
                    <span v-svg-icon="'board'"></span>
                    <p class="board-title">{{ miniBoard.title }}</p>
                </router-link>
            </div>
        </section>


    </aside>
</template>

<script>
import titleModal from './dynamic-modals/title-modal.vue'
export default {

    name: 'board-workspace',
    emits: ['addBoard', 'toggleWorkspace'],
    props: {
        isWorkspaceCollapsed: Boolean
    },
    data() {
        return {
            showTitle: false,
            isSearchClicked: false,
            filter: '',
        }
    },
    computed: {
        miniBoards() {
            return this.$store.getters.miniBoards
        },
        miniBoardsToShow() {
            if (!this.filter) return this.miniBoards
            const regex = new RegExp(this.filter, 'i')
            return this.miniBoards.filter(miniBoard => regex.test(miniBoard.title))
        }
    },
    methods: {
        setFilter(ev) {
            this.filter = ev.target.value
        },
        addBoard() {
            this.showTitle = false
            this.$emit('addBoard')
        },
        toggleWorkspace() {
            this.$emit('toggleWorkspace')
        },
        // isCurrBoard(miniBoardIdx) {
        //     return miniBoardIdx === this.$route.params.id
        // }
    },
    components: {
        titleModal
    },
    created() {



    },
    updated() {

    }

}
</script>

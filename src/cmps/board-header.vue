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
                <button class="view-item">
                    <span v-svg-icon="'outlineHome'"></span>
                    <p class="view-title">Main Table</p>
                </button>
            </section>
        </section>
        <board-filter :filterBy="filterBy" :users="users" @filter="setFilter" @addTask="$emit('addTask')"
            @addGroup="addGroup" />
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
            isEditing: false
        }
    },
    methods: {
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
        }
    },
    components: {
        boardFilter,
    },
    computed: {
        boardTitle() { return this.$store.getters.board.title }
    },

}
</script>
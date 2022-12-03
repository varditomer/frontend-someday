<template>
    <section class='board-header'>
        <section class="header">
            <section class="top-header">
                <h1 class="board-title">{{ boardTitle }}</h1>
                <span v-svg-icon="'more'"></span>
            </section>
            <section class="add-views">
                <button class="view-item">
                    <span v-svg-icon="'outlineHome'"></span>
                    <p class="view-title">Main table</p>
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
    emits: ['filter', 'addTask', 'addGroup'],
    props: {
        users: Array,
        filterBy: Object
    },
    methods: {
        addGroup() {
            this.$emit('addGroup')
        },
        setFilter(filter) {
            this.$emit('filter', filter)
        },
    },
    components: {
        boardFilter,
    },
    computed: {
        boardTitle() { return this.$store.getters.board.title }
    },

}
</script>
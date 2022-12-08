<template>
    <section class='multi-filter-modal flex column'>
        <div class="multi-filter-header flex">
            <div class="left-section">
                <div class="title">Quick filters</div>
                <span>Showing all of {{ filterItems }} items</span>
            </div>
            <div class="right-section">
                <div class="clear-all">
                    <span @click="" :class="{ 'bold': isFlittered }">Clear all</span>
                </div>
            </div>


        </div>
        <section class="filter-area flex column">
            <div class="filter-area-title">
                <h2>All columns</h2>
            </div>
            <div class="filter-groups">
                <multi-filter-column v-for="i in 5" />
            </div>
        </section>
    </section>
</template>
<script>
import multiFilterColumn from './multi-filter-column.vue'
export default {
    name: 'multi-filter-modal',
    props: {},
    data() {
        return {
            filterItems: null
        }
    },
    created() {
        this.filterItems = 46
        this.isFlittered = false

    },
    computed: {},
    methods: {
        // uncheckAllFilters(
        //     this.
        // )
    },
    components: {
        multiFilterColumn
    }
}
</script>
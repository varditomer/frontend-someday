<template>
    <section class='multi-filter-modal flex column'>
        <div class="multi-filter-header flex">
            <div class="left-section">
                <div class="title">Quick filters</div>
                <span>Showing all of {{ filterItems }} items</span>
            </div>
            <div class="right-section">
                <div class="clear-all">
                    <span @click="" :class="{ 'bold': isFiltered }">Clear all</span>
                </div>
            </div>


        </div>
        <section class="filter-area flex column">
            <div class="filter-area-title">
                <h2>All columns</h2>
            </div>
            <div class="filter-groups">
                <multi-filter-column v-for="(column, idx) in formattedProps.titles" :column="column" :data="formattedProps.props[idx]" :key="idx" @setSubFilter="setSubFilter" />
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
            filterItems: null,
            multiFilter: {},
            isFiltered: false
        }
    },
    created() {
        this.filterItems = 46

    },
    computed: {
        formattedProps() {
            const dataMap = this.$store.getters.dataMap
            const titles = []
            titles.push(...Object.keys(dataMap.tasks))
            const props = dataMap?.groupTitle?.length
                ? [dataMap.groupTitle]
                : []
            titles.forEach(title=>props.push(dataMap.tasks[title]))
            if (dataMap?.groupTitle?.length) titles.unshift('Group')
            return {props, titles}

        }
    },
    methods: {
        setSubFilter(subFilter, type){
            console.log(`type:`, type)
            console.log(`subFilter:`, subFilter)
            if (type === 'Group') this.multiFilter = {...this.multiFilter, groupTitle:subFilter}
            else this.multiFilter.tasks[type] = subFilter
            const filter = this.multiFilter
            console.log(`filter:`, filter)
            this.$store.dispatch({type:'queryBoard', filter})
            //emit filter request: queryBoard - {filter}
        }
        // uncheckAllFilters(
        //     this.
        // )
    },
    components: {
        multiFilterColumn
    }
}
</script>
<template>
    <section v-if="stats.taskCount" class='multi-filter-modal flex column'>
        <div class="multi-filter-header flex">
            <div class="left-section">
                <div class="title">Quick filters</div>
                <span>Showing all of {{ stats.taskCount }} items</span>
            </div>
            <div class="right-section">
                <div class="clear-all">
                    <span @click="clearFilter" :class="{ 'bold': isFiltered }">Clear all</span>
                </div>
            </div>


        </div>
        <section class="filter-area flex column">
            <div class="filter-area-title">
                <h2>All columns</h2>
            </div>
            <div class="filter-groups">
                <multi-filter-column v-for="(column, idx) in formattedProps.columns" :column="column" :stats="stats"
                    :data="formattedProps.props[idx]" :key="idx" @setSubFilter="setSubFilter"
                    :multiFilter="this.storeMultiFilter" />
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
            isFiltered: false
        }
    },
    created() {
        this.multiFulter = this.storeMultiFilter
    },
    computed: {
        formattedProps() {
            const dataMap = this.$store.getters.dataMap
            const columns = []
            columns.push(...Object.keys(dataMap.tasks))
            const props = dataMap?.groupTitle?.length
                ? [dataMap.groupTitle]
                : []
            columns.forEach(title => props.push(dataMap.tasks[title]))
            if (dataMap?.groupTitle?.length) columns.unshift('Group')
            return { props, columns }
        },
        stats() {
            return this.$store.getters.stats
        },
        storeMultiFilter() {
            return JSON.parse(JSON.stringify(this.$store.getters.multiFilter))
        }
    },
    methods: {
        setSubFilter(subFilter, type) {
            let filter = this.storeMultiFilter
            if (type === 'Group') { 
                if (!filter.groupTitle) filter.groupTitle = []
                filter.groupTitle = subFilter 
            }
            else {
                if (!filter.tasks) filter.tasks = {}
                filter.tasks[type] = subFilter
            }
            this.$store.commit({ type: 'setMultiFilter', multiFilter: filter })
            this.$store.commit({ type: 'filterBoard', filter })
        },
        clearFilter(){
            console.log(`skdjcnksdjcn`)
            this.$store.commit({ type: 'setMultiFilter' ,multiFilter:{}})
            this.$store.commit({ type: 'filterBoard', filter:{} })
        }
    },
    components: {
        multiFilterColumn
    }
}
</script>
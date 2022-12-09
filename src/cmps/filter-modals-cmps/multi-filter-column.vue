<template>
    <section class='multi-filter-column'>
        <div class="filter-col">
            <div class="title">{{ column }}</div>
            <div class="content flex column">
                <div v-if="column === 'person'" v-for="item in formattedData" class="filter-item person"
                    @click="setSubFilter(item)">
                    <div class="filter-option">
                        <img :src="item.imgUrl" alt="">
                        <span>{{ item.fullname }}</span>
                    </div>
                    <div class="filter-counter">
                        {{stats.valCountData[item] || ''}}
                    </div>
                </div>
                <div v-else v-for="item in formattedData" class="filter-item" @click="setSubFilter(item)">
                    <div class="filter-option">
                        <span v-if="column === 'date'">{{ getFormattedDate(item) }}</span>
                        <div v-else-if="column === 'status' || column === 'priority'">
                            <span class="label-color" :style="getFormattedLabelStyle(item)"></span>{{getFormattedLabel(item)}}
                        </div>
                        <span v-else-if="column === 'numbers'">{{item.toLocaleString()}}</span>
                        <span v-else>{{ item }}</span>
                    </div>
                    <div class="filter-counter">
                        <span> {{stats.valCountData[item] || ''}}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { colorService } from '../../services/color.service'
export default {
    name: 'multi-filter-column',
    emits: ['setSubFilter'],
    props: {
        column: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        stats: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            multiFilter: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },
    created() {
        console.log(`this.valCountMap`, this.stats.valCountMap)
    },
    computed: {
        formattedData() {
            return this.data.filter(item => item)
        },
    },
    methods: {
        setSubFilter(item) {
            const idx = this.multiFilter.indexOf(item)
            if (idx === -1) this.multiFilter.push(item)
            else this.multiFilter.splice(idx, 1)
            if (this.column === 'Group') var filter = { groupTitle: this.multiFilter }
            else {
                filter = {tasks:{}}
                filter.tasks[this.column] = this.multiFilter
            }
            this.$emit('setSubFilter', filter)
        },
        getFormattedDate(item) {
            const monthIdx = (new Date(item)).getMonth()
            return `${this.months[monthIdx]} ${(new Date(item)).getDate()}`
        },
        getFormattedNumber(item) {
            return item.toLocaleString()
        },
        getFormattedLabel(item) {
            return colorService.getLabelById(this.column, item)?.title || ''
        },
        getFormattedLabelStyle(item) {
            const color = colorService.getLabelById(this.column, item)?.value || '#c4c4c4'
            return `background-color: ${color};`
        }
    },
    components: {}
}
</script>

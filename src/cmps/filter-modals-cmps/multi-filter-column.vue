<template>
    <section class='multi-filter-column'>
        <div class="filter-col">
            <div class="title">{{ column }}</div>
            <div class="content flex column">
                <div v-if="column === 'person'" v-for="item in formattedData" class="filter-item person"
                    @click="setSubFilter(item.val)">
                    <div class="filter-option">
                        <img :src="item.val.imgUrl" alt="">
                        <span>{{ item.val.fullname }}</span>
                    </div>
                    <div class="filter-counter">
                        {{}}
                    </div>
                </div>
                <div v-else v-for="item in formattedData" class="filter-item" @click="setSubFilter(item.val)">
                    <div class="filter-option">
                        <span v-if="column === 'date'">{{ getFormattedDate(item.val) }}</span>
                        <div v-else-if="column === 'status' || column === 'priority'">
                            <span class="label-color" :style="getFormattedLabelStyle(item.val)"></span>{{
                                    getFormattedLabel(item.val)
                            }}
                        </div>
                        <span v-else-if="column === 'numbers'">{{ item.val.toLocaleString() }}</span>
                        <span v-else>{{ item.val }}</span>
                    </div>
                    <div class="filter-counter">
                        <span> {{ }}</span>
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
        },
        multiFilter: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            filterBy: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },
    created() {
        if (this.multiFilter.groupTitle && this.column === 'Group') this.filterBy = [...this.multiFilter.groupTitle]
        if (this.multiFilter?.tasks) this.filterBy = [...this.multiFilter.tasks[this.column]] || []
    },
    computed: {
        formattedData() {
            return this.data.filter(item => item).map(item => {
                const formattedItem = {
                    val: item,
                    class: ''
                }
                if (this.column === 'Group') {
                    if (this.multiFilter?.groupTitle?.includes(item)) formattedItem.class = 'selected'
                } else if (this.multiFilter?.tasks && this.multiFilter?.tasks[this.column]?.includes(item)) formattedItem.class = 'selected'
                return formattedItem
            })
        },
        getClass() {
        }
    },
    methods: {
        setSubFilter(item) {
            const idx = this.filterBy.indexOf(item)
            if (idx === -1) this.filterBy.push(item)
            else this.filterBy = this.filterBy.filter((val, valIdx)=>idx !== valIdx)
            if (this.column === 'Group') var filter = { groupTitle: this.filterBy }
            else {
                filter = { tasks: {} }
                filter.tasks[this.column] = this.filterBy
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

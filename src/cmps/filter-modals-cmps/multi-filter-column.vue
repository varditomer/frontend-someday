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
                        22
                    </div>
                </div>
                <div v-else v-for="item in formattedData" class="filter-item" @click="setSubFilter(item)">
                    <div class="filter-option">
                        <span>
                            {{ item }}
                        </span>
                    </div>
                    <div class="filter-counter">
                        <span>4</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
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
        }
    },
    data() {
        return {
            multiFilter: []
        }
    },
    created() {
    },
    computed: {
        formattedData() {
            return this.data.filter(item => item)
        }
    },
    methods: {
        setSubFilter(item) {
            debugger
            const idx = this.multiFilter.indexOf(item)
            if (idx === -1) this.multiFilter.push(item)
            else this.multiFilter.splice(idx, 1)
            if (this.column === 'Group') var filter = { groupTitle: this.multiFilter }
            else {
                filter = {}
                filter[this.column] = this.multiFilter
            }
            this.$emit('setSubFilter', filter)
        },
    },
    components: {}
}
</script>

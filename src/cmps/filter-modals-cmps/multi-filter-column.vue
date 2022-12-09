<template>
    <section class='multi-filter-column'>
        <div class="filter-col">
            <div class="title">{{ column }}</div>
            <div class="content flex column">
                <div v-for="item in formattedData" class="filter-item" @click="setSubFilter(item)">{{ item }}</div>
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
            const idx = this.multiFilter.indexOf('Group')
            if (idx === -1) this.multiFilter.push(item)
            else this.multiFilter.splice(idx, 1)
            this.$emit('setSubFilter', this.multiFilter, this.column)
        }
    },
    components: {}
}
</script>

<template>
    <section class='multi-filter-modal'>
        <h1>Quick filters<span>Showing all of {{ filterItems }} items</span></h1>
    </section>
</template>
<script>
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

    },
    computed: {},
    methods: {},
    components: {}
}
</script>
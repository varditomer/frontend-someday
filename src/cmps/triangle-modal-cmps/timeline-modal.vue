<template>
    <el-date-picker  @blur="handleClose" popper-class="timeline-modal" v-model="value1" type="daterange" range-separator="To"
        start-placeholder="Start date" end-placeholder="End date" teleported="false"/>
</template>

<script>

export default {
    name: '',
    props: {
        content: Object
    },
    data() {
        return {
            value1: 0,
            value2: 0,
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
    },
}
</script>

<style>
    .timeline-modal{
        z-index:10000;
        left: 50%;
    }
</style>
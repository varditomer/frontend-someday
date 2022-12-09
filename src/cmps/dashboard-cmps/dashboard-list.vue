<template>
    <section class='dashboard-list'>
        <h1>Task summary</h1>
        <section class="dashboard-cmp">
            <div class="section">
                <div class="section-title">
                    <span class="title-icon" v-svg-icon="'coloredBoard'"></span>
                    <h3 class="title">Project estimate</h3>
                </div>
                <div class="section-card">
                    <div class="card-icon">
                        <span v-svg-icon="'bigDuplicate'"></span>
                    </div>
                    <h4 class="card-title">Done</h4>
                    <div class="card-counter">23</div>
                </div>
                
            </div>
            <div class="right-section"></div>
        </section>
    </section>
</template>
<script>
export default {
    name: 'dashboard-list',
    props: {},
    data() {
        return {}
    },
    created() { },
    computed: {},
    methods: {},
    components: {}
}
</script>

<style>



</style>
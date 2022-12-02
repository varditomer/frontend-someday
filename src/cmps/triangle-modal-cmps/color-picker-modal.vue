<template>
    <section class="color-picker">
        <span v-for="priority in getFormattedPrioities" :class="priority.pClass" :style="priority.style"
            :title="priority.title">
        </span>
    </section>
</template>

<script>
export default {
    name: '',
    props: {
        priorities: {
            type: Array,
            required: true
        },
        users: Array
    },
    data() {
        return {
        }
    },
    created(){
        console.log(`this.priorities`, this.priorities)
    },
    methods: {
    },
    computed: {
        getFormattedPrioities() {
            return this.priorities.map(priority => {
                const pClass = 'label'
                const style = { backgroundColor: priority.color }
                const { title } = priority
                return { title, pClass, style }
            })
        }
    },
    components: {
    },
}
</script>
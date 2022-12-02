<template>
    <section class="task-label-modal">
        <span v-for="label in getFormattedLabels" :class="label.pClass" :style="label.style">
            {{label.title}}
        </span>
    </section>
</template>

<script>
export default {
    name: '',
    props: {
        content: {
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
        console.log(`this.contnet`, this.contnet)
    },
    methods: {
    },
    computed: {
        getFormattedLabels() {
            return this.content.map(label => {
                const pClass = 'label'
                const style = { backgroundColor: label.color }
                const { title } = label
                return { title, pClass, style }
            })
        }
    },
    components: {
    },
}
</script>
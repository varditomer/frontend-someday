<template>
    <section class="task-label-modal">
        <span v-for="label in getFormattedLabels" :class="label.pClass" :style="label.style"
            @click="updateTask(label.title)">
            <span v-svg-icon="'changeColor'" class="change-color" @click.stop=""></span>
            {{ label.title === 'Default' ? '' : label.title }}
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
        name: String
    },
    emits: ['updateTask'],
    data() {
        return {
        }
    },
    methods: {
        updateTask(val) {
            const key = this.name
            console.log(`val`, val)
            this.$emit('updateTask', { key, val })
        }
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
<template>
    <section class="task-label-modal">
        <span v-for="label in getFormattedLabels" :class="label.pClass" :style="label.style"
            @click="updateTask(label.title)">
            <!-- <span v-svg-icon="'changeColor'" class="change-color" @click.stop=""></span> -->
            {{ label.title === 'Default' ? '' : label.title }}
        </span>
        <colorPicker selectedColor="''"/>
    </section>
</template>

<script>
import colorPicker from '../regular-modal-cmps/color-picker-modal.vue'
export default {
    name: 'label-picker-modal',
    props: {
        additionalDb: {
            type: Array,
            required: true
        },
        content: String,
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
            this.$emit('updateTask', { key, val })
        }
    },
    computed: {
        getFormattedLabels() {

            if (!this.additionalDb?.length) return []
            return this.additionalDb.map(label => {
                const pClass = 'label'
                const style = { backgroundColor: label.color }
                const { title } = label
                return { title, pClass, style }
            })
        }
    },
    components: {
        colorPicker
    },
}
</script>
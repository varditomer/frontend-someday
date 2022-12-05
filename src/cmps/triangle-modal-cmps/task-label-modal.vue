<template>
    <section class="task-label-modal">
        <span v-for="label in getFormattedLabels" class="color-box" :class="label.pClass" :style="label.style"
            @click="updateTask(label.title)">
            <!-- <span v-svg-icon="'changeColor'" class="change-color" @click.stop=""></span> -->
            {{ label.title === 'Default' ? '' : label.title }}
        </span>
        <regular-modal :cmp="'color-picker-modal'" :showModal="false" :color="''" @updateSelection="updateProperty" />
    </section>
</template>

<script>
import regularModal from '../dynamic-modals/regular-modal.vue'
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
            showColorPicker: false
        }
    },
    methods: {
        updateTask(val) {
            const key = this.name
            this.$emit('updateTask', { key, val })
        },
        updateProperty(value) {
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
        regularModal
    },
}
</script>
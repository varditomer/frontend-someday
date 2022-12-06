<template>
    <section class="task-label-modal">
        <div v-for="label in getFormattedLabels" class="color-box">
            <span :class="label.pClass" :style="label.style"
                @click="updateTask(label.title)">
                <!-- <span v-svg-icon="'changeColor'" class="change-color" @click.stop=""></span> -->
            </span>
            <span class="name">{{ label.title === 'Default' ? '' : label.title }}</span>
        </div>
        <span class="label-btn flex helper">
            <div class="flex center" @click="toggleEdit">
                <span v-if="!isBeingEditted" v-svg-icon="'editLabel'"></span>
                {{ isBeingEditted ? 'Apply' : 'Edit Labels' }}
            </div>
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
            showColorPicker: false,
            isBeingEditted: false
        }
    },
    methods: {
        updateTask(val) {
            const key = this.name
            this.$emit('updateTask', { key, val })
        },
        updateProperty(value) {
        },
        toggleEdit() {
            this.isBeingEditted = !this.isBeingEditted
            if (!this.isBeingEditted) this.saveChoice()
        },
        saveChoice() {

        }
    },
    computed: {
        getFormattedLabels() {

            if (!this.additionalDb?.length) return []
            return this.additionalDb.map(label => {
                const pClass = `label ${this.isBeingEditted ? 'onEdit' : ''}`
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
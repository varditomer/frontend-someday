<template>
    <section class="task-label-modal">
        <div v-for="(label, idx) in getFormattedLabels" class="color-box" :class="{ 'on-edit': isBeingEditted }">
            <span :class="label.pClass" :style="label.style" @click="(renderModal(idx))">
                <span v-if="isBeingEditted" v-svg-icon="'changeColor'" class="change-color"></span>
            </span>
            <span class="name" :class="{ 'on-edit': isBeingEditted }" :contenteditable="isBeingEditted"
                @blur="updateLabels(idx, 'title', $event.target.innerText)">
                {{ label.title !== 'Default' ? label.title : isBeingEditted ? 'Default' : '' }}
            </span>
            <regular-modal :cmp="'color-picker-modal'" :showModal="(showColorPicker && idx === selectedIdx)" :color="''" @updateSelection="updateProperty" />
        </div>
        <span class="label-btn flex helper">
            <div class="flex center" @click="toggleEdit">
                <span v-if="!isBeingEditted" v-svg-icon="'editLabel'"></span>
                {{ isBeingEditted ? 'Apply' : 'Edit Labels' }}
            </div>
        </span>
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
            isBeingEditted: false,
            updatedDb: [],
            selectedIdx: -1
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
            console.log(`this.updatedDb`, this.updatedDb)
        },
        updateLabels(labelIdx, key, val) {
            this.updatedDb = this.additionalDb.map((label, idx) => {
                const newLabel = {...label}
                if (idx === labelIdx) newLabel[key] = val
                return newLabel
            })
        },
        renderModal(idx){
            this.showColorPicker = true; 
            this.selectedIdx = idx
        }
    },
    computed: {
        getFormattedLabels() {

            if (!this.additionalDb?.length) return []
            return this.additionalDb.map(label => {
                const pClass = `label ${this.isBeingEditted ? 'on-edit' : ''}`
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
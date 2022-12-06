<template>
    <section class="task-label-modal">
        <div v-for="(label, idx) in getFormattedLabels" class="color-box" :class="{ 'on-edit': isBeingEditted }">
            <span :class="label.pClass" :style="label.style" @click="(renderModal(idx))">
                <span v-if="isBeingEditted" v-svg-icon="'changeColor'" class="change-color"></span>
            </span>
            <span class="name" :class="{ 'on-edit': isBeingEditted }" :contenteditable="isBeingEditted"
                @blur="updateLabels(idx, 'title', $event.target.innerText)" @click="updateTask($event.target.innerText)">
                {{ label.title !== 'Default' ? label.title : isBeingEditted ? 'Default' : '' }}
            </span>
            <regular-modal :target="'label'" :cmp="'color-picker-modal'" :idx="selectedIdx" :showModal="(showColorPicker && idx === selectedIdx)" :color="''" @updateSelection="updateLabels" />
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
            selectedIdx: -1,
            color: '',
            labelTitle:''
        }
    },
    methods: {
        updateTask(val) {
            if (this.isBeingEditted) return
            const key = this.name
            this.$emit('updateTask', { key, val })
        },
        toggleEdit() {
            this.isBeingEditted = !this.isBeingEditted
            if (!this.isBeingEditted) this.updateTask(this.labelTitle)
        },
        updateLabels(labelIdx, key, val) {
            debugger
            this.updatedDb = this.additionalDb.map((label, idx) => {
                const newLabel = {...label}
                if (idx === labelIdx) newLabel[key] = val
                return newLabel
            })
            this.showColorPicker = false
            localStorage.setItem('label', JSON.stringify(this.updatedDb))
            if (key === 'title') this.labelTitle = val
        },
        renderModal(idx){
            this.selectedIdx = idx
            this.showColorPicker = true; 
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
        },
    },
    components: {
        regularModal
    },
}
</script>
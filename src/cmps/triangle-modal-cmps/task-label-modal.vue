<template>
    <section class="task-label-modal">
        <div v-for="(label, idx) in getFormattedLabels" class="color-box" :class="{ 'on-edit': isBeingEditted }">
            <span :class="label.className" :style="label.style" @click="(renderModal(idx))">
                <span v-if="isBeingEditted" v-svg-icon="'changeColor'" class="change-color"></span>
            </span>
            <span class="name" :class="{ 'on-edit': isBeingEditted }" :contenteditable="isBeingEditted"
                @blur="updateLabels(idx, 'title', $event.target.innerText)"
                @click="updateTask($event.target.innerText)">
                {{ label.title !== 'Default' ? label.title : isBeingEditted ? 'Default' : '' }}
            </span>
            <!-- <regular-modal :cmp="'color-picker-modal'"  :idx="selectedIdx" :showModal="(showColorPicker && idx === selectedIdx)" :color="''" @updateSelection="updateProperty" /> -->
            <regular-modal :target="'label'" :cmp="'color-picker-modal'" :idx="selectedIdx"
                :showModal="(showColorPicker && idx === selectedIdx)" :name="name" :colors="colors" :color="''" @updateSelection="updateLabels" />
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
        content: String,
        name: String,
        colors: {
            type: Object,
            required: false
        }
    },
    emits: ['updateTask'],
    data() {
        return {
            showColorPicker: false,
            isBeingEditted: false,
            updatedDb: [],
            selectedIdx: -1,
            color: '',
            labelTitle: ''
        }
    },
    methods: {
        updateTask(val) {
            if (this.isBeingEditted) return
            const key = this.name
            const formattedVal = this.colors[key].find(label => label.title === val)?._id || 'Default'
            this.$emit('updateTask', { key, val:formattedVal })
        },
        toggleEdit() {
            this.isBeingEditted = !this.isBeingEditted
            if (!this.isBeingEditted) this.updateTask(this.labelTitle)
        },
        updateLabels(labelIdx, key, val) {
            console.log(`labelIdx`, labelIdx)
            console.log(`key`, key)
            console.log(`val`, val)
        },
        renderModal(idx) {
            this.showColorPicker = true;
            this.selectedIdx = idx
            this.showColorPicker = true;
        }
    },
    computed: {
        getFormattedLabels() {
            return this.colors[this.name].map(label => {
                const className = `label ${this.isBeingEditted ? 'on-edit' : ''}`
                const style = {backgroundColor: label.value}
                const {title} = label
                return {className, style, title}
            })
        },
    },
    components: {
        regularModal
    },
}
</script>
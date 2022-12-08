<template>
    <section class="task-label-modal">
        <div v-for="(label, idx) in getFormattedLabels" class="color-box" :class="{ 'on-edit': isBeingEditted }">
            <span :class="label.className" :style="label.style" @click="(renderModal(idx, label.title))">
                <span v-if="isBeingEditted" v-svg-icon="'changeColor'" class="change-color"></span>
            </span>
            <span class="name" :class="{ 'on-edit': isBeingEditted }" :contenteditable="isBeingEditted"
                @blur="updateLabels(name, label.id, $event.target.innerText, label.value )"
                @click="updateTask($event.target.innerText)">
                {{ label.title !== 'Default' ? label.title : isBeingEditted ? 'Default' : '' }}
            </span>
            <!-- <regular-modal :cmp="'color-picker-modal'"  :idx="selectedIdx" :showModal="(showColorPicker && idx === selectedIdx)" :color="''" @updateSelection="updateProperty" /> -->
            <regular-modal class="color-picker-modal-parent" v-if="(showColorPicker && idx === selectedIdx)" :name="name" :cmp="'color-picker-modal'" :idx="selectedIdx"
                :id="content" :colors="colors" :selected="''" @updateSelection="updateLabels" />
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
import {colorService} from '../../services/color.service.js'
export default {
    name: 'label-picker-modal',
    props: {
        content: String,
        colors: {
            type: Object,
            required: false
        },
        name: {
            type: String,
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
            colorTitle: '',
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
        updateLabels(type, id, title = 'New Label', val) {
            colorService.update(type, id, title, val)
            this.$store.dispatch({type: 'loadColors'})
            this.showColorPicker = false

        },
        renderModal(idx) {
            this.showColorPicker = true;
            this.selectedIdx = idx
            this.showColorPicker = true;
            this.colorTitle
        }
    },
    computed: {
        getFormattedLabels() {
            return this.colors[this.name].map(label => {
                
                const {value, title, _id:id} = label
                const className = `label ${this.isBeingEditted ? 'on-edit' : ''}`
                const style = {backgroundColor: value}
                return {className, style, title, id, value}
            })
        },
    },
    components: {
        regularModal
    },
}
</script>
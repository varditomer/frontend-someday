<template>
    <section class="labels" @click="clickToEdit">
        <span class="label-name" :style="getStyle">{{ content === 'Default' ? '' : content }}</span>
        <triangle-modal :content="content" :name="name" :additionalDb="additionalDb" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" v-if="show" />
    </section>
</template>

<script>
import { colors } from '../../data/color-picker.js'
import { labels } from '../../data/_labelsDB.js'
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'labels',
    emits: ['updateTask', 'editing'],
    props: {
        content: String,
        name: String,
        additionalDb: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        updateTask(labelObj) {
            this.$emit('updateTask', labelObj)
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        }
    },
    computed: {
        getStyle() {
            if (!this.content || !this.content === 'default') return { 'background-color': colors['$clr-explosive'] }
            return {
                'background-color': colors[labels[this.content]],
                color: 'white'
            }
        }
    },
    components: {
        triangleModal
    }
}
</script>
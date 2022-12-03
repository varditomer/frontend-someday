<template>
    <section class="labels" @click="(show = true)">
        <span class="label-name" :style="getStyle">{{ content === 'Default' ? '' : content }}</span>
        <triangle-modal :content="content" :name="name" :additionalDb="additionalDb" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" v-if="show" />
    </section>
</template>

<script>
import { colors } from '../../data/color-picker.js'
import { labels } from '../../data/_board_DB.js'
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'labels',
    emits: ['updateTask'],
    props: {
        content: String,
        name: String,
        additionalDb: {
            type: Array,
            reqiured: true
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        updateTask(labelObj) {
            this.show = false
            this.$emit('updateTask', labelObj)
        },
    },
    computed: {
        getStyle() {
            if (!this.content || !this.content === 'Default') return { 'background-color': colors['$clr-lgt-gry'] }
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
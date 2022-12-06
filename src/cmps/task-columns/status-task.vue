<template>
    <section :style="getStyle" class="status-item" @click="(show = true)">
        {{ prop === 'Default' ? '' : prop }}

        <triangle-modal :content="statuses" :name="'status'" @updateTask="updateTask" @hideModal="(show = false)"
            :cmp="'task-label-modal'" v-if="show" />
    </section>
</template>

<script>
import { status } from '../../data/_labelsDB.js'
import { colors } from '../../data/color-picker.js'
import triangleModal from '../dynamic-modals/triangle-modal.vue'

export default {
    name: 'statusPreview',
    emits: ['updateTask'],
    props: {
        prop: String,
        statuses: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            status: status,
            show: false
        }
    },
    methods: {
        updateTask(statusObj) {
            this.show = false
            this.$emit('updateTask', statusObj)
        },
    },
    computed: {
        getStyle() {
            if (!this.prop || !this.prop === 'Default') return { 'background-color': colors['$clr-explosive'] }
            return {
                'background-color': colors[status[this.prop.trim()]],
                color: 'white'
            }
        }
    },
    components: {
        triangleModal
    }
}
</script>
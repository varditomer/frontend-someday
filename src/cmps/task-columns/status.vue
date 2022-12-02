<template>
    <section v-if="prop" :style="getStyle" class="status-item"  @click="(show = true)">
        {{ prop }}

        <triangle-modal :content="statuses" :name="'status'" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" v-if="show" />
    </section>

    <section v-else> </section>
</template>

<script>
import { status } from '../../data/_board_DB.js'
import { colors } from '../../data/color-picker.js'
import triangleModal from '../dynamic-modals/triangle-modal.vue'

export default {
    name: 'statusPreview',
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
        updateTask(priority) {
            this.show = false
            this.$emit('updateTask', priority)
        },
    },
    computed: {
        getStyle() {
            return {
                'background-color': colors[status[this.prop]],
                color: 'white'
            }
        }
    },
    components: {
        triangleModal
    }
}
</script>
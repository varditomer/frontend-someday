<template>
    <section class="priority" @click="(show = true)">
        <span class="priority-name" :style="getStyle">{{ prop }}</span>
        <triangle-modal :users="users" :content="priorities" :name="'priority'" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" v-if="show" />
    </section>
</template>

<script>
import { priority } from '../../data/_board_DB.js'
import { colors } from '../../data/color-picker.js'
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: '',
    props: {
        prop: String,
        priorities: {
            type: Array,
            required: true,
        },
        users: Array
    },
    emits: ['updateTask'],
    data() {
        return {
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
            if (!this.prop) return { 'background-color': colors['$priority-gry'] }
            return {
                'background-color': colors[priority[this.prop]],
                color: 'white'
            }
        }
    },
    components: {
        triangleModal
    }
}
</script>
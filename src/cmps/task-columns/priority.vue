<template>
    <section class="priority" @click="(show = true)">
        <span class="priority-name" :style="getStyle">{{ prop === 'Default' ? '' : prop }}</span>
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
    emits: ['updateTask'],
    props: {
        prop: String,
        priorities: {
            type: Array,
            required: true,
        },
        users: Array
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        updateTask(priorityObj) {
            this.show = false
            this.$emit('updateTask', priorityObj)
        },
    },
    computed: {
        getStyle() {
            if (!this.prop || !this.prop === 'Default') return { 'background-color': colors['$clr-lgt-gry'] }
            return {
                'background-color': colors[priority[this.prop.trim()]],
                color: 'white'
            }
        }
    },
    components: {
        triangleModal
    }
}
</script>
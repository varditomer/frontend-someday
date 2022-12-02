<template>
    <span @click="(show = true)" class="task-date">
        <triangle-modal v-if="show" @hideModal="(show = false)" @setDate="setDate" :prop="prop" :cmp="'dateModal'" />
        {{ formattedDate || ' ' }}
    </span>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    emits: ['setDate'],
    name: 'date-column',
    props: {
        prop: Number,
        users: Array
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            show: false
        }
    },
    computed: {
        formattedDate() {
            if (isNaN(this.prop)) return ''
            const monthIdx = (new Date(this.prop)).getMonth()
            return `${this.months[monthIdx]} ${(new Date(this.prop)).getDate()}`
        },
    },
    methods: {
        setDate(timestamp) {
            this.$emit('setDate', timestamp)
            setTimeout(() => {
                this.show = false
            }, 1)
        },
    },
    components: {
        triangleModal
    }
}
</script>
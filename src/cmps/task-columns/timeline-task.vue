<template>
    <section @click="(show = true)" class="timeline">
        <div v-if="content" class="range" @mouseenter="isHovering=true" @mouseleave="isHovering=false">
            <div class="value" :style="style"></div>
            <p v-if="isHovering" class="text">{{timeDiff}} d</p>
            <p v-else class="text">{{ dateStr }}</p>
        </div>
        <!-- <triangle-modal v-if="show" :cmp="'timelineModal'" :content="content" /> -->
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
import { getReasonableTimeDiff } from '../../services/util.service.js'

export default {
    name: '',
    emits: ['updateTask'],
    props: {
        content: {
            type: Object,
            required: false
        },
        color: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            show: false,
            isHovering: false
        }
    },
    computed: {
        getTimelineBar() {
            if (!this.content?.start || !this.content?.end) return 0
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
            const diffInDays =  this.timeDiff
            const timeElapsed = Math.ceil((Date.now() - start) / (1000 * 60 * 60 * 24))
            const percentage = (100 * (+timeElapsed) / (+diffInDays))
            return percentage > 100
                ? 100 + '%'
                : percentage < 0
                    ? 0 + '%'
                    : percentage + '%'
        },
        style() {
            return {
                width: this.getTimelineBar,
                backgroundColor: this.color
            }
        },
        dateStr() {
            if (!this.content) return ''
            const { start, end } = this.content
            let str = `${this.months[start.month]} ${start.day}, '${+start.year % 100} - '`
            str += `${this.months[end.month]} ${end.day}, '${+end.year % 100}`
            return str
        },
        timeDiff() {
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
            return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        }
    },
    components: {
        triangleModal
    },
}
</script>
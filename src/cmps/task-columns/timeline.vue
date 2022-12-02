<template>
    <section class="timeline">
        <div class="range">
            <div class="value" :style="style"></div>
        </div>
    </section>
</template>

<script>
import { utilService } from '../../services/util.service.js'
export default {
    name: '',
    props: {
        prop: {
            type: Object,
            required: false
        },
        users: {
            type: Array,
            required: false
        },
        color: {
            type: String,
            required: false
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
    },
    computed: {
        getTimelineBar() {
            if (!this.prop?.start || !this.prop?.end) return 0
            const start = (new Date([this.prop.start.year, this.prop.start.month + 1, this.prop.start.day])).getTime()
            const end = (new Date([this.prop.end.year, this.prop.end.month + 1, this.prop.end.day])).getTime()
            const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            const timeElapsed = Math.ceil((Date.now() - start) / (1000 * 60 * 60 * 24))
            const percentage = (100 * (+timeElapsed) / (+diffInDays))
            return percentage > 100
                ? 100
                : percentage < 0
                    ? 0
                    : percentage
        },
        style() {
            return {
                width: this.getTimelineBar + '%',
                backgroundColor: this.color
            }
        },
    },
    components: {
    },
}
</script>
<template>
    <section class="timeline">
        <div class="range">
            <div class="value" :style="style"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: '',
    emits:['updateTask'],
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
        }
    },
    created() {
    },
    methods: {
    },
    computed: {
        getTimelineBar() {
            if (!this.content?.start || !this.content?.end) return 0
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
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
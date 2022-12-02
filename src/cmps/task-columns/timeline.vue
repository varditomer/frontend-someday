<template>
    <section class="timeline">
        <div class="range">
            <div class="value" :style="{ width: getTimelineBar + '%' }"></div>
        </div>
    </section>
</template>

<script>
import { utilService } from '../../services/util.service.js'
export default {
    name: '',
    props: {
        prop: {
            type: Array,
            required: false
        },
        users: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        getTimelineBar() {
            const start = (new Date([this.prop.start.year, this.prop.start.month, this.prop.start.day])).getTime()
            if (start < Date.now()) return 0
            const end = (new Date([this.prop.end.year, this.prop.end.month, this.prop.end.say])).getTime()
            if (end >= Date.now()) return 100
            const diffInDays = utilService.getReasonableTimeDiff(start, end)
            const diffNowFromStart = utilService.getReasonableTimeDiff(start, Date.now())
            console.log(`diffInDays`, diffInDays)
            console.log(`diffNowFromStart`, diffNowFromStart)
            return 100 * (+diffNowFromStart) / (+diffInDays)
        }
    },
    components: {
    },
}
</script>
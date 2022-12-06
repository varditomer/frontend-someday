<template>
    <div class="activity">
        <span v-svg-icon="getIcon"></span>
        <p>{{ activity.type }}</p>
    </div>
    <div class="activity-change" v-if="isString">
        <div class="from" :style="`background-color:${formattedData('from')}`">
            <p :class="{ 'txt': isColored }">{{ formattedText(activity.from) ? formattedText(activity.from) : '━━' }}</p>
        </div>
        <span v-svg-icon="'arrowRight'"></span>
        <div class="to" :style="`background-color:${formattedData('to')}`">
            <p :class="{ 'txt': isColored }">
                {{ formattedText(activity.to) }}
            </p>
        </div>
    </div>
    <div class="person-activity" v-else>
        <p class="person-activity-txt">
            {{ formattedText(activity.from) }}
        </p>
    </div>

</template>

<script>
export default {
    name: 'activity',
    props: {
        activity: {
            type: Object,
            required: false
        }
    },
    computed: {
        statuses() {
            return this.$store.getters.statuses
        },
        priorities() {
            return this.$store.getters.priorities
        },
        isColored() {
            return (this.activity.type !== 'status' && this.activity.type !== 'priority')
        },
        getIcon() {
            const type = this.activity.type
            console.log(type);
            switch (type) {
                case 'status': return 'board'
                case 'priority': return 'board'
                case 'date': return 'time'
                case 'text': return 'copyText'
                case 'title': return 'copyText'
                case 'numbers': return 'numbers'
                case 'person': return 'filterPerson'
            }
        },
        isString() {
            const text = this.activity.from
            const lastText = this.activity.to
            return (typeof text === 'string' || typeof text === 'number' || typeof lastText === 'string' || typeof lastText === 'number')
        }
    },
    methods: {
        formattedData(dir) {
            const type = this.activity.type
            switch (type) {
                case 'status': return this.statuses.find(status => status.title === this.activity[dir]).color
                case 'priority': return this.priorities.find(priorities => priorities.title === this.activity[dir]).color
                default: return 'white'
            }
        },
        formattedText(text) {
            if (typeof text === 'string' || typeof text === 'number') return text
            if (typeof text === 'object') return `${text.txt} ${text.name}`
        }

    }
}
</script>
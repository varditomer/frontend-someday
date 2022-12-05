<template>
    <div class="activity">
        <span v-svg-icon="activity.icon"></span>
        <p>{{ activity.type }}</p>
    </div>
    <div class="activity-change">
        <div class="from" :style="`background-color:${formattedDataFrom.color}`">
            <p>{{ formattedDataFrom.title }}</p>
        </div>
        <span v-svg-icon="'arrowRight'"></span>
        <div class="to" :style="`background-color:${formattedDataTo.color}`">
            <p>
                {{ activity.to }}
            </p>
        </div>
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
        formattedDataFrom() {
            const type = this.activity.type
            switch (type) {
                case 'status': return this.statuses.find(status => status.title === this.activity.from)
                case 'priority': return this.priorities.find(priorities => priorities.title === this.activity.from)
            }
        },
        formattedDataTo() {
            const type = this.activity.type
            switch (type) {
                case 'status': return this.statuses.find(status => status.title === this.activity.to)
                case 'priority': return this.priorities.find(priorities => priorities.title === this.activity.to)
            }
        },
        statuses() {
            return this.$store.getters.statuses
        },
        priorities() {
            return this.$store.getters.priorities
        }
    }
}
</script>

<!-- priorities: [
{ title: 'Critical', color: '#333333', colorName: '$clr-blackish' },
{ title: 'High', color: '#401694', colorName: '$clr-dark-indigo' },
{ title: 'Medium', color: '#5559df', colorNmae: '$clr-indigo' },
{ title: 'Low', color: '#579bfc', colorName: '$clr-bright-blue' },
{ title: 'Default', color: '#c4c4c4', colorName: '$clr-explosive' }
],
statuses: [
{ title: 'Done', color: '#00c875', colorName: '$clr-done-green' },
{ title: 'Working on it', color: '#fdac3d', colorName: '$clr-lgt-orng' },
{ title: 'Stuck', color: '#e2445c', colorName: '$clr-stuck-red' },
{ title: 'Unattained', color: '#0086c0', colorName: '$clr-dark-blue' },
{ title: 'Default', color: '#c4c4c4', colorName: '$clr-explosive' },
], -->
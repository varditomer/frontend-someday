<template>
    <div class="activity">
        <span v-svg-icon="'add'"></span>
        <p>{{ activity.type }}</p>
    </div>
    <div class="activity-change">
        <div class="from" :style="`background-color:${formattedData('from')}`">
            <p :class="{ 'txt': isColored }">{{ activity.from }}</p>
        </div>
        <span v-svg-icon="'arrowRight'"></span>
        <div class="to" :style="`background-color:${formattedData('to')}`">
            <p :class="{ 'txt': isColored }">
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
        statuses() {
            return this.$store.getters.statuses
        },
        priorities() {
            return this.$store.getters.priorities
        },
        isColored() {
            return (this.activity.type !== 'status' && this.activity.type !== 'priority')
        }
    },
    methods: {
        formattedData(dir) {
            const type = this.activity.type
            console.log(dir);
            switch (type) {
                case 'status': return this.statuses.find(status => status.title === this.activity[dir]).color
                case 'priority': return this.priorities.find(priorities => priorities.title === this.activity[dir]).color
                default: return 'white'
            }
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
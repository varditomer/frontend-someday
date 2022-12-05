<template>
    <div class="activity">
        <span v-svg-icon="activity.icon"></span>
        <p>{{ activity.type }}</p>
    </div>
    <div class="activity-change">
        <div class="from">
            <p>{{ activity.from }}</p>
        </div>
        <span v-svg-icon="'arrowRight'"></span>
        <div class="to">
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
}
</script>
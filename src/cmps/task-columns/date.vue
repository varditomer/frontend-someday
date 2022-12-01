<template>
    <span class="task-date">
        {{ formattedDate || ' ' }}
    </span>
</template>

<script>
export default {
    name: 'date-column',
    props: {
        prop: Number,
        users: Array
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    },
    computed: {
        formattedDate() {
            if (isNaN(this.prop)) return ''
            const monthIdx = (new Date(this.prop)).getMonth()
            return `${this.months[monthIdx]} ${(new Date(this.prop)).getDate()}`
        },
    },
}
</script>
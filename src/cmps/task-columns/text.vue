<template>
    <section>
        {{prop || ''}}
    </section>
</template>

<script>
export default {
    name: '',
    emits:['updateTask'],
    props: {
        prop: String,
        users: Array
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
    },
}
</script>
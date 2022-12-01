<template>
    <section>
        {{prop || ''}}
    </section>
</template>

<script>
export default {
    name: '',
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
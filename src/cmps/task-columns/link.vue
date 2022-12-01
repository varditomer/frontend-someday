<template>
    <a v-if="prop?.url" :href="prop.url" target="_blank">{{ prop.title }}</a>
    <span v-else class="empty-span"></span>
</template>

<script>
export default {
    name: 'link-column',
    props: {
        prop: Object,
        users: Array
    },
    created(){

    }
}
</script>
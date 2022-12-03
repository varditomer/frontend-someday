<template>
    <section class="link flex center" @click="(show = true)">
        <a @click.stop="" v-if="prop?.url" :href="`//${prop.url}`" target="_blank">{{ prop.title }}</a>
        <triangle-modal :cmp="'linkModal'" :prop="prop" @hideModal="(show = false)" v-if="show"
            @updateTask="updateTask" />
        <!-- <span v-else class="empty-span"></span> -->
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue';
export default {
    emits: ['updateTask'],
    name: 'link-column',
    props: {
        prop: Object,
        users: Array
    },
    data() {
        return {
            show: false,

        }

    },
    methods: {
        openModal() {
        },
        updateTask(linkObj) {
            this.$emit('updateTask', linkObj)
        }
    },
    components: {
        triangleModal

    }
}
</script>
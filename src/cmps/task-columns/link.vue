<template>
    <section class="link flex center" @click="(show = true)">
        <a @click.stop="" v-if="content?.url" :href="`//${content.url}`" target="_blank">{{ content.title }}</a>
        <triangle-modal :cmp="'linkModal'" :content="content" @hideModal="(show = false)" v-if="show"
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
        content: Object,
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
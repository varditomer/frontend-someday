<template>
    <section class="link flex center" @click="(show=true)">
        <a @click.stop="" v-if="prop?.url" :href="prop.url" target="_blank">{{ prop.title }}</a>
        <triangle-modal :cmp="'linkModal'" :link="prop" @hideModal="(show=false)" v-if="show" @saveLink="saveLink"/>
        <!-- <span v-else class="empty-span"></span> -->
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue';
export default {
    emits: ['saveLink'],
    name: 'link-column',
    props: {
        prop: Object,
        users: Array
    },
    created(){

    },
    data() {
        return {
            show: false,

        }

    },
    methods: {
        openModal() {
            console.log(`openLinkModal:`, )
        },
        saveLink(link) {
            this.$emit('saveLink', link)
        }
    },
    components: {
        triangleModal
        
    }
}
</script>
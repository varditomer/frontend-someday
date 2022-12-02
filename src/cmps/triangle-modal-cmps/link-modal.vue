<template>
    <section class='link-modal flex column center'>
        <div class="address">
            <label for="link-address-url" class="link-title">Web address</label>
            <input v-model="url" id="link-address-url" v-focus type="link" placeholder="www.example.com">
        </div>
        <div class="address">
            <label for="txt-to-display" class="link-title">Text to display</label>
            <input v-model="title" id="txt-to-display" type="text" placeholder="Text to display">
        </div>
    </section>
</template>
<script>
export default {
    name: 'link-modal',
    emits: ['saveLink'],
    props: {
        link: {
            type: Object,
            required: false
        }
    },
    created() {
        if (this.link?.title && this.link?.url) {
            this.url = this.link.url
            this.title = this.link.title
        }

    },
    data() {
        return {
            url: '',
            title: ''
        }
    },
    unmounted() {
        this.$emit('saveLink', {url: this.url, title: this.title} )
    },

    computed: {
    },
    methods: {
    }
}
</script>

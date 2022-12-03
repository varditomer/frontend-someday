<template>
    <form class='link-modal flex column center' @submit.prevent="saveLink" v-click-outside="saveLink">
        <div class="address">
            <label for="link-address-url" class="link-title">Web address</label>
            <input v-model="url" id="link-address-url" v-focus type="link" placeholder="www.example.com">
        </div>
        <div class="address">
            <label for="txt-to-display" class="link-title">Text to display</label>
            <input v-model="title" id="txt-to-display" type="text" placeholder="Text to display">
        </div>
        <button type="submit"></button>
    </form>
</template>
<script>
export default {
    name: 'link-modal',
    emits: ['updateTask'],
    props: {
        prop: {
            type: Object,
            required: false
        }
    },
    created() {
        if (this.prop?.title && this.prop?.url) {
            this.url = this.prop.url
            this.title = this.prop.title
        }
    },
    data() {
        return {
            url: '',
            title: ''
        }
    },    
    unmounted() {
        const link = {url: this.url, title: this.title}
        this.$emit('updateTask', {key: 'link', val: link} )
    },
    methods: {
        saveLink() {
        this.$emit('saveLink', {url: this.url, title: this.title} )

        }
    }
}
</script>

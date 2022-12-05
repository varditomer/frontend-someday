<template>
    <section class="txt flex center" @click="(isEditing = true)">
        <div v-if="isEditing" class="editing-mode" v-click-outside="updateTask" @key.enter="updateTask">
            <input v-focus type="text" class="edit" v-model="text">
        </div>
        <div v-if="(text && !isEditing)">
            {{ text }}
        </div>
        <div v-else-if="!isEditing" class="not-editing-mode flex center hidden">
            <div v-if="!text" class="hovering flex align-center">
                <span class="plus" v-svg-icon="'plus'"></span>
                Tt
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['updateTask'],
    name: 'txt',
    props: {
        content: String,
        required: false
    },
    created() {
        if (this.content) this.text = this.content
    },
    data() {
        return {
            isEditing: false,
            text: null
        }
    },
    methods: {
        setNotEditing() {
            this.isEditing = false
        },
        updateTask() {
            console.log(`this.text:`, this.text)
            this.setNotEditing()
            if(!this.text) return
            this.$emit('updateTask', { key: 'text', val: this.text })
        }
    },
    components: {
    }
}
</script>
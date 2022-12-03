<template>
    <section class="shallow">
        <div  class="static" v-if="!isBeingEditted" @click="this.isBeingEditted = true">
            {{ content ? content : '' }}
        </div>
        <div  class="dynamic" v-else>
            <input type="number" v-focus :value="content" v-if="name === 'numbers'"
                @blur="updateTask($event.target.value)" @keyup.enter="updateTask($event.target.value)" />
            <textarea v-else v-focus @blur="updateTask($event.target.value)" :value="content"></textarea>
        </div>
    </section>
</template>

<script>
export default {
    name: '',
    emits: ['updateTask'],
    props: {
        content: String,
        name: String
    },
    data() {
        return {
            isBeingEditted: false,
        }
    },
    created() {
    },
    methods: {
        updateTask(val) {
            this.$emit('updateTask', { key: this.name, val })
            this.isBeingEditted = false
        }
    },
    computed: {
    },
    components: {
    },
}
</script>
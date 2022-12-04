<template>
    <section class="numbers flex center" @click="(isEditing = true)">
        <div v-if="isEditing" class="editing-mode" v-click-outside="updateTask" @key.enter="updateTask">
            <input v-focus type="number" class="edit" v-model="numbers">
        </div>
        <div v-if="(numbers && !isEditing)">
            {{ formattedNum }}
        </div>
        <div v-else-if="!isEditing" class="not-editing-mode flex center hidden">
            <div v-if="numbers" class="hovering"></div>
            <div class="not-hovering flex align-center">
                <span class="plus" v-svg-icon="'plus'"></span>
                123
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['updateTask'],
    name: 'numbers',
    props: {
        content: Number,
        required: false
    },
    created() {
        if (this.content) this.numbers = this.content
    },
    data() {
        return {
            isEditing: false,
            numbers: null
        }
    },
    computed: {
        formattedNum() { if (this.numbers) return this.numbers.toLocaleString() },
    },
    methods: {
        setNotEditing() {
            this.isEditing = false
        },
        updateTask() {
            this.setNotEditing()
            if(!this.numbers) return
            console.log(`this.numbers:`, this.numbers)
            this.$emit('updateTask', { key: 'numbers', val: this.numbers })
        }
    },
    components: {
    }
}
</script>
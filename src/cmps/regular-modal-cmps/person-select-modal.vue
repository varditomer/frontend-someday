<template>
    <section class='person-select-modal'>
        <div class="left-sec">
            <div class="selected-count">{{ selectedTasks.length }}</div>
            <h2>{{ selectedTasks.length > 1 ? 'Items selected' : 'Item selected' }}</h2>
        </div>
        <div class="right-sec">
            <div class="tasks-item">
                <span class="delete-tasks-btn" v-svg-icon="'bigTrash'"></span>
                <p>Delete</p>
            </div>
            <span @click="unselectTasks" class="close-modal-btn" v-svg-icon="'exit'"></span>
        </div>


    </section>
</template>
<script>
export default {
    emits: ['unselectTasks'],
    props: {
        selectedTasks: Array,
        required: false
    },
    name: 'person-select-modal',
    methods: {
        unselectTasks() {
            
            this.$emit('unselectTasks')
        }
    }
}
</script>
<template>
    <section class='task-select-modal'>
        <div class="left-sec">
            <div class="selected-count">{{ selectedTasks.length }}</div>
            <h2>{{ selectedTasks.length > 1 ? 'Items selected' : 'Item selected' }}</h2>
        </div>
        <div class="right-sec">
            <div class="tasks-item">
                <span class="delete-tasks-btn" v-svg-icon="'bigTrash'" @click="deleteMultiple"></span>
                <p>Delete</p>
            </div>
            <span @click="unselectTasks" class="close-modal-btn" v-svg-icon="'exit'"></span>
        </div>


    </section>
</template>
<script>
export default {
    emits: ['unselectTasks','deleteMultiple'],
    props: {
        selectedTasks: Array,
        required: false
    },
    name: 'task-select-modal',
    methods: {
        unselectTasks() {
            
            this.$emit('unselectTasks')
        },
        deleteMultiple(){
            this.$emit('deleteMultiple')
        }
    }
}
</script>
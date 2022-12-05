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
import {eventBus} from '../../services/event-bus.service.js'
export default {
    emits: ['deleteMultiple'],
    props: {
        selectedTasks: Array,
        required: false
    },
    name: 'task-select-modal',
    methods: {
        unselectTasks() {
            eventBus.emit('unselectTasks')
        },
        deleteMultiple(){
            this.$emit('deleteMultiple')
        }
    }
}
</script>
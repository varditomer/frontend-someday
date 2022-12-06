<template>
    <section class='task-select-modal'>
        <div class="left-sec">
            <div class="selected-count">{{ selectedTasks.length }}</div>
            <div class="selectedItemsAndDots flex column center">
                <h2>{{ selectedTasks.length > 1 ? 'Items selected' : 'Item selected' }}</h2>
                <div class="dots-container">
                    <div class="dots" v-for="task in currSelectedLines" :style="{backgroundColor: task.color}"></div>
                </div>
            </div>
            <!-- {{ selectedTasks }} -->
        </div>
        <div class="right-sec">
            <div class="tasks-item">
                <span class="duplicate-tasks-btn" v-svg-icon="'bigDuplicate'" @click="duplicateMultiple"></span>
                <p class="duplicate-txt">Duplicate</p>
            </div>
            <div class="tasks-item">
                <span class="delete-tasks-btn" v-svg-icon="'bigTrash'" @click="deleteMultiple"></span>
                <p>Delete</p>
            </div>
            <span @click="unselectTasks" class="close-modal-btn" v-svg-icon="'exit'"></span>
        </div>


    </section>
</template>
<script>
import { eventBus } from '../../services/event-bus.service.js'
export default {
    emits: ['deleteMultiple', 'duplicateMultiple'],
    props: {
        selectedTasks: Array,
        required: false
    },
    name: 'task-select-modal',
    methods: {
        unselectTasks() {
            eventBus.emit('unselectTasks')
        },
        deleteMultiple() {
            this.$emit('deleteMultiple')
        },
        duplicateMultiple() {
            this.$emit('duplicateMultiple')
        },

    },
    data() {
        return {
            currSelectedLines: null
        }
    },
    created() {
        console.log(`this.selectedTasksWithColor:`, this.selectedTasks)

    },
    watch: {
        selectedTasks: {
            handler(newState, oldState) {
                this.currSelectedLines = newState
                console.log(`11:`, )
            },
            deep: true

        }

    },
}
</script>
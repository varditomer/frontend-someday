<template>
    <section class='task-select-modal'>
        <div class="left-sec">
            <!-- <div class="selected-count">{{ selectedTasks.length }}</div>
            <h2>{{ selectedTasks.length > 1 ? 'Items selected' : 'Item selected' }}</h2> -->
            {{ selectedTasks }}
        </div>
        <div class="right-sec">
            <div class="tasks-item">
                <span class="duplicate-tasks-btn" v-svg-icon="'bigDuplicate'" @click="duplicateMultiple"></span>
                <p>Duplicate</p>
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
            selectedTasksClrs: null
        }
    },
    created() {
        this.selectedTasksClrs = this.$store.getters.getSelectedTasksColorsByIds
        // console.log(`this.selectedTasksClrs:`, this.selectedTasksClrs)

    },
    watch: {
        selectedTasks: {
            handler(newState, oldState) {
                this.selectedTasksClrs = this.$store.getters.getSelectedTasksColorsByIds
                console.log(`this.selectedTasksClrs:`, this.selectedTasksClrs)
                console.log(`newState:`, newState)
            },
            deep: true

        }

    },
}
</script>
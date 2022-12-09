<template>
    <section class="kanban-task-list-container">
        <draggable v-model="group.tasks" animation="220" itemKey="element._id" :class="{ 'task-dragged': beingDragged }"
            class="task-list" group="task-list">
            <template #item="{ element }">
                <task-list :task="element"/>
            </template>
        </draggable>
    </section>
</template>

<script>
import taskList from './kanban-task-list.vue'
import draggable from 'vuedraggable'

export default {
    name: '',
    props: {
        group: Object,
        // groups:Array
    },
    data() {
        return {
            beingDragged: false,
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        taskList,
        draggable,
    },
}
</script>
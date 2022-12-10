<template>
    <section class="kanban-task-list-container">
        <draggable v-model="group.tasks" animation="220" itemKey="element.title" :class="{ 'task-dragged': beingDragged }"
            @end="saveTasks" class="task-list" group="task-list">
            <template #item="{ element }">
                <task-list :task="element" :labelId="group._id" :kanbanType="kanbanType"/>
            </template>
        </draggable>
    </section>
</template>

<script>
import taskList from './kanban-task-list.vue'
import draggable from 'vuedraggable'

export default {
    name: '',
    emits: ['saveTasks'],
    props: {
        group: {
            type:
                Object,
            required: true,
        },
        kanbanType: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            beingDragged: false,
        }
    },
    methods: {
        saveTasks(){
            // const tasks = JSON.parse(JSON.stringify(this.group.tasks))
            this.$emit('saveTasks')
        }
    },
    computed: {
    },
    components: {
        taskList,
        draggable,
    },
}
</script>
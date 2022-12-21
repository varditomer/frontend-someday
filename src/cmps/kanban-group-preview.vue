<template>
    <section class="kanban-task-list-container">
        <draggable v-model="group.tasks" animation="220" itemKey="element.title"
            :class="{ 'task-dragged': beingDragged }" @end="saveTasks" class="task-list" group="task-list" delayOnTouchOnly="true">
            <template #item="{ element }">
                <task-list :task="element" :labelId="group._id" :kanbanType="kanbanType" />
            </template>
        </draggable>
        <div class="task-list" group="task-list">

            <section class="task-preview add-task">
                <div class="top-sec">
                    <p>New task</p>
                </div>
                <div class="persons">
                    <span v-svg-icon="'smallPerson'" class="person-icon"></span>
                    <p class="person-text">Person</p>
                    <!-- <div class="task-persons">
                        <span v-if="task.person?.length" v-for="person in task.person" class="task-avatar">
                            <img :src="person.imgUrl" alt="">
                        </span>
                        <span v-else v-svg-icon="'smallPerson'" class="task-avatar default"></span>
                    </div> -->
                </div>
                <div class="label">
                    <span v-svg-icon="'status'"></span>
                    <p class="label-text capitalize">{{ kanbanType }} </p>
                    <div :style="{ backgroundColor: getDefaultLabel.value }" class="inner-label">{{
                            getDefaultLabel.title
                    }}
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import taskList from './kanban-task-list.vue'
import draggable from 'vuedraggable'
import { colorService } from '../services/color.service.js'

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
        saveTasks() {
            // const tasks = JSON.parse(JSON.stringify(this.group.tasks))
            this.$emit('saveTasks')
        }
    },
    computed: {
        getDefaultLabel() {
            return colorService.getLabelById(this.kanbanType, 'qwdlk')
        }
    },
    components: {
        taskList,
        draggable,
    },
}
</script>
<template>
    <section class='group-preview'>
        <div class="group-title flex align-center" :class="{ minimized: !viewTasks }">
            <div class="options hidden flex center">
                <span @click="lineOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="group-arrow" v-svg-icon="'arrowDown'" @click="toggleTaskView"></span>
            <h4 contenteditable @input="saveGroup($event.target.innerText, 'title')"
                :style="{ color: group.style.color }" v-html="group.title"></h4>
            <p class="hidden task-count">{{ getFormattedTaskCount }}</p>
        </div>
        <task-list v-if="viewTasks" :tasks="group.tasks" :group="group" :cmpsOrder="cmpsOrder" :users="users"
            :priorities="priorities" :statuses="statuses" @saveTask="saveTask" @removeTask="removeTask" />
    </section>
</template>
<script>
import taskList from './task-list.vue'
import { eventBus } from '../services/event-bus.service.js'
export default {
    name: 'group-preview',
    emits: ['saveTask', 'removeTask', 'saveGroup'],
    props: {
        group: Object,
        cmpsOrder: Array,
        users: Array,
        priorities: {
            type: Array,
            reqired: true
        },
        statuses: {
            type: Array,
            reqired: true
        },
    },
    data() {
        return {
            viewTasks: true,
        }
    },
    mounted() {
        eventBus.on('minimzed-groups', minimzeGroup => {
            this.viewTasks = !minimzeGroup
        })
    },
    methods: {
        toggleTaskView() {
            this.viewTasks = !this.viewTasks
        },
        saveTask(task) {
            this.$emit('saveTask', task)
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        },
        saveGroup(val, prop) {
            this.group[prop] = val
            this.$emit('saveGroup', this.group)
        }
    },
    computed: {
        getDoneTasksCount() {
            return this.group.tasks.reduce((counter, task) => {
                if (task.status === 'Done') conuter++
                return conuter
            }, 0)
        },
        getFormattedTaskCount() {
            const { tasks } = this.group
            if (!tasks.length) return 'No Items'
            let str = `${tasks.length} Item`
            if (tasks.length > 1) str += 's'
            if (tasks[0].subTasks?.length) {
                str += ` / ${tasks[0].subTasks.length} Subitem`
                if (tasks[0].subTasks.length === 1) return str
                return str + 's'
            }
            return str
        },
        getSubitemsCount() {
            return this.group.tasks.reduce((acc, task) => {
                acc += task.subTasks?.length || 0
                return acc
            }, 0)
        }
    },
    components: {
        taskList
    }
}
</script>
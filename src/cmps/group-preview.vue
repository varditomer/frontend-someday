<template>
    <section class='group-preview' @keydown.escape="(showModal = false)">
        <regular-modal v-if="showModal" :groupId="group._id" :showModal="showModal" @closeModal="(showModal = false)"
            @addGroup="addGroup" :cmp="'group-opt-modal'" @keydown.escape="(showModal = false)" />
        <div class="group-title flex align-center" :class="{ minimized: !viewTasks }"
            @keydown.escape="(showModal = false)">

            <div class="options hidden flex center">
                <span @click="showGroupOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="group-arrow" v-svg-icon="'arrowDown'" @click="toggleTaskView"></span>
            <div class="group-title-content">
                <h4 @click="(showTitle = false)" @mouseover="(showTitle = true)" @mouseout="(showTitle = false)" contenteditable
                    @input="saveGroup($event.target.innerText, 'title')" :style="{ color: group.style.color }"
                    v-html="group.title">
                </h4>
                <title-modal :class="{'show':showTitle}" :content="'Click to Edit'" />
            </div>
            <p class="hidden task-count">{{ getFormattedTaskCount }}</p>
        </div>
        <task-list v-if="viewTasks" :tasks="group.tasks" :group="group" :cmpsOrder="cmpsOrder" :users="users"
            :priorities="priorities" :statuses="statuses" @saveTask="saveTask" @removeTask="removeTask" />
    </section>
</template>
<script>
import titleModal from './dynamic-modals/title-modal.vue'
import taskList from './task-list.vue'
import { eventBus } from '../services/event-bus.service.js'
import regularModal from './dynamic-modals/regular-modal.vue'
export default {
    name: 'group-preview',
    emits: ['saveTask', 'removeTask', 'saveGroup'],
    props: {
        group: Object,
        cmpsOrder: Array,
        users: Array,
        priorities: {
            type: Array,
            required: true
        },
        statuses: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            viewTasks: true,
            showModal: false,
            showTitle: false
        }
    },
    mounted() {
        eventBus.on('minimized-groups', minimizeGroups => {
            this.viewTasks = !minimizeGroups
        })
        eventBus.on('minimized-single-group', ({ _id, minimizeGroup }) => {
            // this.viewTasks = !minimizeGroup
            if (this.group._id === _id) this.viewTasks = !minimizeGroup
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
        },
        addGroup() {
            this.$emit('addGroup')
        },
        showGroupOptions() {
            this.showModal = true
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
        taskList,
        regularModal,
        titleModal
    }
}
</script>
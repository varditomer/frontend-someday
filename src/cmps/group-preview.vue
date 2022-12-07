<template>

    <section class='group-preview' @keydown.escape="(showModal = false)">


        <regular-modal v-if="showModal" :groupId="group._id" :selectedColor="group.style.color" :showModal="showModal"
            @closeModal="(showModal = false)" @addGroup="addGroup" @removeGroup="removeGroup" :cmp="'group-opt-modal'"
            @keydown.escape="(showModal = false)" @editGroupTitle="editGroupTitle"
            @propagateMenu="showColorPicker = true" @duplicateGroup="duplicateGroup" />


        <section class="group-preview-title">

            <div class="group-prev" :class="{ 'collapse': !viewTasks }">

                <div class="static">

                    <div class="options flex center">
                        <span class="dots hidden" @click="showGroupOptions" v-svg-icon="'fatMore'"></span>
                    </div>

                    <span class="group-arrow" :class="{ 'collapsed': !viewTasks }"
                        :style="{ fill: group.style.color, 'border-left': collapsedBorder }" v-svg-icon="'arrowDown'"
                        @click="toggleTaskView"></span>

                    <div class="group-title-text">
                        <h4 @click="(showTitle = false)" @mouseover="(showTitle = true)" @mouseout="(showTitle = false)"
                            contenteditable @blur="saveGroup($event.target.innerText, 'title')"
                            :style="{ color: group.style.color }" v-html="group.title" ref="title">
                        </h4>

                        <p class="hidden task-count flex center">{{ getFormattedTaskCount }}</p>

                    </div>
                    <regular-modal v-if="showModal" class="group-color-picker" :cmp="'color-picker-modal'"
                        :selectedColor="group.style.color" :showModal="showColorPicker" @updateSelection="saveGroup"
                        @closeModal="showColorPicker = false" />

                </div>

                <div class="dynamic">


                    <div v-if="!viewTasks" class="cmps">
                        <div v-for="cmp in cmpsOrder" class="cmp-title">
                            {{ (cmp === 'text' || cmp === 'link' || cmp === 'date') ? '' : cmp }}
                        </div>
                    </div>

                    <task-summary v-if="!viewTasks" :isCollapsed="true" :cmpsOrder="cmpsOrder" :tasks="group.tasks"
                        :groupColor="group.style.color" class="task-footer group-collapsed" :colors="colors" />

                    <div v-if="viewTasks" v-for="cmp in cmpsOrder" class="empty-div"></div>


                </div>

            </div>

        </section>

        <task-list v-if="viewTasks" @addColumn="addColumn" @toggleSelectAllTasks="toggleSelectAllTasks"
            @saveSelectedTasks="saveSelectedTasks" @saveBoard="saveBoard" :selectedTasks="selectedTasks"
            :tasks="group.tasks" :group="group" :cmpsOrder="cmpsOrder" :users="users" :priorities="priorities"
            :statuses="statuses" @addGroup="addGroup" @saveTask="saveTask" @removeTask="removeTask"
            @duplicateTask="duplicateTask" :colors="colors" />
    </section>

</template>
<script>
import titleModal from './dynamic-modals/title-modal.vue'
import taskList from './task-list.vue'
import { eventBus } from '../services/event-bus.service.js'
import regularModal from './dynamic-modals/regular-modal.vue'
import taskSummary from './task-summary.vue'

export default {
    name: 'group-preview',
    emits: ['saveTask', 'removeTask', 'saveGroup', 'removeGroup', 'saveSelectedTasks', 'saveBoard', 'addGroup', 'toggleSelectAllTasks', 'duplicateGroup', 'duplicateTask', 'addColumn'],
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
        selectedTasks: {
            type: Array,
            required: false
        },
        colors: {
            type: Object,
            reqiured: true
        }
    },
    data() {
        return {
            viewTasks: true,
            showModal: false,
            isEditing: false,
            showTitle: false,
            showColorPicker: false,
        }
    },
    mounted() {
        eventBus.on('collapse-groups', collapseGroups => {
            this.viewTasks = !collapseGroups
        })
        eventBus.on('collapse-single-group', ({ _id, collapseGroup }) => {
            // this.viewTasks = !collapseGroup
            if (this.group._id === _id) this.viewTasks = !collapseGroup
        })
    },
    methods: {
        saveBoard(cmpsOrder) {
            this.$emit('saveBoard', cmpsOrder)
        },
        toggleTaskView() {
            this.viewTasks = !this.viewTasks
        },
        saveTask(task, activity) {
            this.$emit('saveTask', task, activity)
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        },
        duplicateTask(task) {
            this.$emit('duplicateTask', task)
        },
        saveGroup(val, prop) {
            this.showColorPicker = false;
            this.group[prop] = val
            this.$emit('saveGroup', this.group)
        },
        addGroup() {
            this.$emit('addGroup')
        },
        removeGroup() {
            this.$emit('removeGroup', this.group)
        },
        showGroupOptions() {
            this.showModal = true
        },
        editGroupTitle() {
            this.$nextTick(() => this.$refs.title.focus())
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
        },
        toggleSelectAllTasks(tasks, groupId, areAllSelected) {
            this.$emit('toggleSelectAllTasks', tasks, groupId, areAllSelected)
        },
        duplicateGroup() {
            this.$emit('duplicateGroup', this.group)
        },
        addColumn(cmp) {
            this.$emit('addColumn', cmp)
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
        },
        collapsedBorder() {
            const border = this.viewTasks ? 'none' : `5px solid ${this.group.style.color}`
            return border
        }
    },
    components: {
        taskList,
        regularModal,
        titleModal,
        taskSummary
    },
    created() {
    }
}
</script>
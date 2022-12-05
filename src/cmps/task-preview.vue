<template>
    <section class="li-wrapper" ref="line" :class="{editedLine: editing}">
        <regular-modal :cmp="'task-opt-modal'" @openTask="openTask" @removeTask="removeTask"
            @closeModal="(showModal = false)" :showModal="showModal" @taskTitleToClipboard="copyToClipboard(task.title)"
            @linkToClipboard="copyToClipboard(task.link.url)" />
        <li class="content-li" v-click-outside="unSelectLine">
            <div class="options flex center">
                <span class="hidden" @click="lineOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="task-select" :style="{ 'border-left-color': group.style.color }">
                <input :checked="isSelected" ref="checkbox" @click="selectTask(task._id)" type="checkbox" />
            </span>
            <router-link class="task-title-item" :to="('/board/' + board._id + '/task/' + task._id)">
                <div class="task-title-item">
                    <span>
                        <p @blur="updateTask({ key: 'title', val: $event.target.innerText })"
                            @keydown.enter.prevent="updateTask({ key: 'title', val: $event.target.innerText })"
                            @click.prevent="" class="task-title" contenteditable="true" v-html="task.title"></p>
                    </span>
                    <span v-if="task.comments?.length" class="task-comment-icon count-comment">
                        <span v-svg-icon="'commentCount'"></span>
                        <span class="task-comments-length">{{ task.comments.length }}</span>
                    </span>
                    <span v-else v-svg-icon="'addComment'" class="task-comment-icon"></span>
                </div>
            </router-link>
            <component v-for="(column, idx) in formattedData" :is="column.cmpName + 'Task'" :content="column.content"
                :name="column.name" :additionalDb="column.additionalDb" :color="group.style.color" :key="idx"
                @updateTask="updateTask" @editing="setIsEditing">
            </component>
            <span class="empty-span"></span>
        </li>
    </section>
</template>
<script>
import dateTask from './task-columns/date-task.vue'
import linkTask from './task-columns/link-task.vue'
import personTask from './task-columns/person-task.vue'
import shallowTask from './task-columns/shallow-task.vue'
import labelTask from './task-columns/labels-task.vue'
import timelineTask from './task-columns/timeline-task.vue'
import regularModal from './dynamic-modals/regular-modal.vue'
import numbersTask from './task-columns/numbers-task.vue'
import textTask from './task-columns/text-task.vue'

export default {
    name: 'task-preview',
    emits: ['updateTask', 'removeTask', 'saveSelectedTasks'],
    props: {
        task: Object,
        cmpsOrder: Array,
        users: Array,
        group: {
            type: Object,
            required: true
        },
        additionalDb: Object,
        selectedTasks: {
            type: Array,
            required: false
        },
        isSelected: Boolean
    },
    created() {
        this.editing = false
    },
    data() {
        return {
            showModal: false,
            editing: null,
            
        }
    },
    computed: {

        formattedData() {
            return this.cmpsOrder.map(cmp => {
                const formattedCmp = {
                    content: this.task[cmp] || null
                }
                switch (cmp) {
                    case 'person':
                        formattedCmp.additionalDb = this.additionalDb.users
                    case 'date':
                    case 'link':
                    case 'timeline':
                    case 'numbers':
                    case 'text':
                        formattedCmp.cmpName = cmp
                        break
                    // formattedCmp.cmpName = 'shallow'
                    // formattedCmp.name = cmp
                    // break
                    case 'priority':
                    case 'status':
                    case 'label':
                        formattedCmp.cmpName = 'label'
                        formattedCmp.name = cmp
                        formattedCmp.additionalDb = this.additionalDb[cmp] || []
                        break
                }

                return formattedCmp
            })
        },
        persons() {
            return this.task.persons.map(person => person.fullname).join(' ')
        },
        board() {
            return this.$store.getters.board
        },

    },
    methods: {
        updateTask({ key, val }) {
            const task = this.task
            task[key] = val
            this.$emit('updateTask', task)
        },
        lineOptions() {
            this.showModal = true
        },
        openTask() {
            this.$router.push('/board/' + this.board._id + '/task/' + this.task._id)
        },
        removeTask() {
            this.$emit('removeTask', this.task)
            this.showModal = false
        },
        selectTask(taskId) {
            this.$emit('saveSelectedTasks', taskId)
        },
        copyToClipboard(data) {
            if (!data) return
            this.$copyText(`${data}`)
        },
        setIsEditing() {
            return this.editing = true
        },
        unSelectLine() {
            return this.editing = false
        }
    },
    components: {
        dateTask,
        linkTask,
        personTask,
        labelTask,
        shallowTask,
        timelineTask,
        regularModal,
        numbersTask,
        textTask
    }
}
</script>

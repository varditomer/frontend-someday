<template>
    <section class="li-wrapper">
        <regular-modal :cmp="'task-options'" @openTask="openTask" @removeTask="removeTask"
            @modalClosed="(isModalOpen = false)" :toShow="isModalOpen" />
        <li class="content-li">
            <div class="options hide flex center">
                <span @click="lineOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="task-select"><input multiple type="checkbox" /></span>
            <router-link class="task-title-item" :to="('/board/' + board._id + '/task/' + task._id)">
                <div class="task-title-item">
                    <span>
                        <p @blur="updateTitle" @keydown.enter.prevent="updateTitle" @click.prevent="" class="task-title"
                            contenteditable="true">{{ task.title }}</p>
                    </span>
                    <span v-if="task.comments?.length" class="task-comment-icon count-comment">
                        <span v-svg-icon="'commentCount'"></span>
                        <span class="task-comments-length">{{ task.comments.length }}</span>
                    </span>
                    <span v-else v-svg-icon="'addComment'" class="task-comment-icon"></span>
                </div>
            </router-link>

            <component v-for="(column, idx) in cmpsOrder" :is="column + 'Task'" :prop="task[column]" :users="users" :color="group.style"
                :key="idx">
            </component>
            <span class="empty-span"></span>
            <!-- <span v-for="(column, idx) in cmpsOrder">
                {{ column === 'persons' && task.persons ? persons : task[column] || '-' }}
            </span> -->
        </li>
    </section>
</template>
<script>
import dateTask from './task-columns/date.vue'
import linkTask from './task-columns/link.vue'
import personTask from './task-columns/person.vue'
import statusTask from './task-columns/status.vue'
import numbersTask from './task-columns/numbers.vue'
import textTask from './task-columns/text.vue'
import timelineTask from './task-columns/timeline.vue'
import priorityTask from './task-columns/priority.vue'
import regularModal from './dynamic-modals/regular-modal.vue'

export default {
    name: 'task-preview',
    emits: ['updateTask'],
    props: {
        task: Object,
        cmpsOrder: Array,
        users: Array,
        group: {
            type: Object,
            required: true
        }
    },
    created() {

    },
    data() {
        return {
            isModalOpen: false
        }
    },
    computed: {
        formattedData() {
            return function (parameter) {
                switch (parameter) {
                    case 'persons':
                        return this.task.persons
                            ? this.task.persons.map(person => person.fullname).join(' ')
                            : '-'
                    case 'date':
                        return this.task.date
                            ? (new Date(this.task.date)).toString().slice(0, 12)
                            : '-'
                    case 'link':
                        return this.task.link
                            ? this.task.link
                            : '-'
                    default:
                        return this.task[parameter]
                }
            }
        },
        persons() {
            return this.task.persons.map(person => person.fullname).join(' ')
        },
        board() {
            return this.$store.getters.board
        }
    },
    methods: {
        read(task) {
        },
        lineOptions() {
            this.isModalOpen = true
        },
        openTask() {
            this.$router.push('/board/' + this.board._id + '/task/' + this.task._id)
        },
        removeTask() {
            this.$emit('removeTask', this.task)
            this.isModalOpen = false
        },
        updateTitle(ev) {
            ev.target.blur()
            console.log(ev.target.innerText);
            const { _id, groupId, boardId } = this.task
            const task = {
                title: ev.target.innerText,
                _id,
                groupId,
                boardId
            }
            this.$emit('updateTask', task)
        }
    },
    components: {
        dateTask,
        linkTask,
        personTask,
        statusTask,
        numbersTask,
        textTask,
        priorityTask,
        timelineTask,
        regularModal
    }
}
</script>
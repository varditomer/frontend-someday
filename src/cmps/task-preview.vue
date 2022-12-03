<template>
    <section class="li-wrapper">
        <regular-modal :cmp="'task-opt-modal'" @openTask="openTask" @removeTask="removeTask"
            @closeModal="(showModal = false)" :showModal="showModal" />
        <li class="content-li">
            <div class="options hidden flex center">
                <span @click="lineOptions" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="task-select" :style="{ 'border-left-color': group.style.color }">
                <input multiple type="checkbox" />
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
                @updateTask="updateTask">
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
import shallowTask from './task-columns/shallow.vue'
import labelTask from './task-columns/labels.vue'
import timelineTask from './task-columns/timeline.vue'
import regularModal from './dynamic-modals/regular-modal.vue'
import numbersTask from './task-columns/numbers.vue'

export default {
    name: 'task-preview',
    emits: ['updateTask', 'updateTask', 'removeTask'],
    props: {
        task: Object,
        cmpsOrder: Array,
        users: Array,
        group: {
            type: Object,
            required: true
        },
        additionalDb: Object
    },
    created() {
    },
    data() {
        return {
            showModal: false
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
                        formattedCmp.cmpName = cmp
                        break
                    case 'text':
                        formattedCmp.cmpName = 'shallow'
                        formattedCmp.name = cmp
                        break
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

            // return function (parameter) {
            //     switch (parameter) {
            //         case 'persons':
            //             return this.task.persons
            //                 ? this.task.persons.map(person => person.fullname).join(' ')
            //                 : '-'
            //         case 'date':
            //             return this.task.date
            //                 ? (new Date(this.task.date)).toString().slice(0, 12)
            //                 : '-'
            //         case 'link':
            //             return this.task.link
            //                 ? this.task.link
            //                 : '-'
            //         default:
            //             return this.task[parameter]
            //     }
            // }
        },
        persons() {
            return this.task.persons.map(person => person.fullname).join(' ')
        },
        board() {
            return this.$store.getters.board
        }
    },
    methods: {
        updateTask({ key, val }) {
            console.log(`key:`, key)
            console.log(`val:`, val)
            const task = JSON.parse(JSON.stringify(this.task))
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
    },
    components: {
        dateTask,
        linkTask,
        personTask,
        labelTask,
        // statusTask,
        shallowTask,
        // priorityTask,
        timelineTask,
        regularModal,
        numbersTask
    }
}
</script>
<template>

    <section class='group-list-container' v-if="board.groups">
        <draggable v-model="groups" group="groups" ghost-class="ghost" animation="220" itemKey="element._id"
            @start="beingDragged = true"
            @end="saveBoard"
            :class="{ groupDragged: beingDragged }">
            <template #item="{ element }">
                <group-preview @saveSelectedTasks="saveSelectedTasks" :selectedTasks="selectedTasks" :group="element"
                    :cmpsOrder="cmpsOrder" :users="users" :key="element._id" :priorities="priorities"
                    :statuses="statuses" v-if="board" @saveTask="saveTask" @removeTask="removeTask"
                    @saveGroup="saveGroup" @saveBoard="saveBoard" @addGroup="addGroup" @removeGroup="removeGroup" />
            </template>
        </draggable>
    </section>

</template>
<script>
import groupPreview from './group-preview.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../services/event-bus.service'

export default {
    name: 'group-list',
    emits: ['saveTask', 'removeTask', 'saveGroup', 'removeGroup', 'saveSelectedTasks','saveBoard'],
    props: {
        users: Array,
        board: Object,
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
        }
    },
    data(){
        return {
            beingDragged: false
        }
    },
    methods: {
        minimizeGroups(minimize, ev) {
            // if (!ev?.item?.classList || !ev.item.classList[0] === 'group-preview') return
            // eventBus.emit('minimized-groups', minimize)
        },
        saveBoard(){
            this.beingDragged = false
            this.$emit('saveBoard')
        },
        saveTask(task) {
            this.$emit('saveTask', task)
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        },
        saveGroup(group) {
            this.$emit('saveGroup', group)
        },
        removeGroup(group) {
            console.log(`group:`, group)
            this.$emit('removeGroup', group)
        },
        addGroup() {
            console.log(`add group - group list:`,)
            this.$emit('addGroup')
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
        }
    },
    computed: {
        groups() {
            return JSON.parse(JSON.stringify(this.board.groups))
        },
        cmpsOrder() {
            return [...this.board.cmpsOrder]
        }
    },
    components: {
        groupPreview,
        draggable
    }
}
</script>
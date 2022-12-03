<template>

    <section class='group-list-container' v-if="board.groups">
        <draggable v-model="groups" :group="{ name: 'board' }" animation="150" itemKey="element._id"
            @start="minimizeGroups(true, $event)" @end="minimizeGroups(false, $event)">
            <template #item="{ element }">
                <group-preview :group="element" :cmpsOrder="cmpsOrder" :users="users" :key="element._id"
                    :priorities="priorities" :statuses="statuses" v-if="board" @saveTask="saveTask"
                    @removeTask="removeTask" @saveGroup="saveGroup" @addGroup="addGroup" />
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
    emits: ['saveTask', 'removeTask', 'saveGroup'],
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
    },
    methods: {
        minimizeGroups(minimize, ev) {
            if (!ev?.item?.classList || !ev.item.classList[0] === 'group-preview') return
            eventBus.emit('minimized-groups', minimize)
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
        addGroup() {
            console.log(`add group - group list:`, )
            this.$emit('addGroup')
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
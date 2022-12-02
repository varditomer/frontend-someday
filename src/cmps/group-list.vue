<template>

    <section class='group-list-container' v-if="board.groups">
        <draggable v-model="groups" :group="{ name: 'board' }" animation="150" itemKey="element._id"
            @start="minimizeGroups(true, $event)" @end="minimizeGroups(false, $event)">
            <template #item="{ element }">
                <group-preview :group="element" :cmpsOrder="cmpsOrder" :users="users" :key="element._id"
                    v-if="board" @saveTask="saveTask" @removeTask="removeTask" />
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
    props: {
        users: Array,
        board: Object
    },
    methods: {
        minimizeGroups(minimize, ev) {
            if (!ev?.item?.classList || !ev.item.classList[0] === 'group-preview') return
            eventBus.emit('minimzed-groups', minimize)
        },
        saveTask(task) {
            this.$emit('saveTask', task)
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        }
    },
    computed: {
        groups(){
            return JSON.parse(JSON.stringify(this.board.groups))
        },
        cmpsOrder(){
            return [...this.board.cmpsOrder]
        }
    },
    async created() {
        const { id } = this.$route.params
        const filterBy = {id, filter:''}
        const board = await this.$store.dispatch({ type: 'getBoardById', filterBy })
    },
    components: {
        groupPreview,
        draggable
    }
}
</script>
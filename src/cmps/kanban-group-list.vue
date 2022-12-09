<template>

    <section class=''>
        <draggable v-if="kanbanBoard?.groups?.length" v-model="kanbanBoard.groups" animation="220" itemKey="element.title"
            :class="{ 'group-dragged': beingDragged }" class="kanban-group-list-container" @end="saveBoard">
            <template #item="{ element }">
                <section class="group-preview" :style="getBorder(element)">
                    <div class="group-title" :style="getColor(element)">
                        <h1>{{ element.title }}</h1>
                    </div>
                        <group-preview :group="element" :tasks="element.tasks"/>
                </section>
            </template>
        </draggable>

    </section>

</template>
<script>
import draggable from 'vuedraggable'
import taskList from './kanban-task-list.vue'
import groupPreview from './kanban-group-preview.vue'

// import triangleModal from './dynamic-modals/triangle-modal.vue'
export default {
    name: 'kanban-group-list',
    data() {
        return {
            show: false,
            beingDragged: false,
            boardToShow: [],

        }
    },
    computed: {
        users() { return this.$store.getters.users },
        kanbanBoard() {
            const kanbanBoard = this.$store.getters.kanbanBoard
            return JSON.parse(JSON.stringify(kanbanBoard))
        },
        groups(){
            return JSON.parse(JSON.stringify(this.kanbanBoard))
        }
    },
    methods: {
        updateTask(personsObj) {
            this.$emit('updateTask', personsObj)
        },
        hide() {
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        },
        getColor(label) {
            return `background-color:${label.color}; `
        },
        getBorder(label) {
            return `border-left: ${label.color} 4px solid;`
        },
        saveBoard() {
            const board1 = JSON.parse(JSON.stringify(this.$store.getters.board))
            // board1.kanbanOrder = this.statuses //.map(status => status._id)

            // this.$store.dispatch({ type: 'saveBoard', board: board1 })
            // console.log(this.labeles)
        },
    },
    async created() {
    },
    components: {
        taskList,
        groupPreview,
        draggable,
        // triangleModal
    }
}
</script>

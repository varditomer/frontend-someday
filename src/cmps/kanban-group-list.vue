<template>

    <section class=''>
        <draggable v-if="kanbanBoard" v-model="statuses" animation="220" itemKey="element._id"
            :class="{ 'group-dragged': beingDragged }" class="kanban-group-list-container" @end="saveBoard">
            <template #item="{ element }">

                <section class="group-preview" :style="getBorder(element)">
                    <div class="group-title" :style="getColor(element)">
                        <h1>{{ element.title }}</h1>
                    </div>
                    <section class="task-list">

                        <div v-for="task in formattedTasks(element)" class="task-preview">

                            <div class="top-sec">
                                <p>{{ task.title }}</p>
                            </div>
                            <div class="persons">
                                <span v-svg-icon="'smallPerson'" class="person-icon"></span>
                                <p class="person-text">Person</p>
                                <div class="task-persons">
                                    <span v-if="task.person.length" v-for="person in task.person" class="task-avatar">
                                        <img :src="person.imgUrl" alt="">
                                    </span>
                                    <span v-else v-svg-icon="'smallPerson'" class="task-avatar default"></span>
                                </div>
                            </div>
                            <div class="status">
                                <span v-svg-icon="'status'"></span>
                                <p class="status-text">Status</p>
                                <div :style="`background-color:${element.value}`" class="status-label">{{ element.title
                                }}
                                </div>
                            </div>

                        </div>

                    </section>
                </section>
            </template>
        </draggable>

    </section>

</template>
<script>
import draggable from 'vuedraggable'
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
            console.log(`this.$store.getters.kanbanBoard`, this.$store.getters.kanbanBoard)
            return this.$store.getters.kanbanBoard },
        statuses() { return this.$store.getters.statuses },
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
        getColor(status) {
            return `background-color:${status.value}; `
        },
        getBorder(status) {
            return `border-left: ${status.value} 4px solid;`
        },
        formattedTasks(status) {
            const id = status._id
            return this.kanbanBoard[id]
        },
        saveBoard(board) {
            const board1 = JSON.parse(JSON.stringify(this.$store.getters.board))
            board1.statusOrder = this.statuses //.map(status => status._id)

            this.$store.dispatch({ type: 'saveBoard', board: board1 })
            console.log(this.statuses)
        }
    },
    async created() {
    },
    components: {
        draggable,
        // triangleModal
    }
}
</script>
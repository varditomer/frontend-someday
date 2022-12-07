<template>

    <section class='kanban-group-list-container'>
        <section v-if="kanbanBoard" v-for="status in statuses" class="group-preview" :style="getBorder(status)">
            <div class="group-title" :style="getColor(status)">
                <h1>{{ status.title }}</h1>
            </div>
            <section class="task-list">

                <div v-for="task in formattedTasks(status)" class="task-preview">

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
                        <div :style="`background-color:${status.value}`" class="status-label">{{ status.title }}
                        </div>
                    </div>

                </div>

            </section>
        </section>

    </section>

</template>
<script>
import triangleModal from '../../cmps/dynamic-modals/triangle-modal.vue'
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
        kanbanBoard() { return this.$store.getters.kanbanBoard },
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
            console.log('saveing');
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadStatuses' })
        const { id } = this.$route.params
        await this.$store.dispatch({ type: 'queryKanbanBoard', id })
        console.log(this.kanbanBoard);
    },
    components: {
        triangleModal
    }
}
</script>
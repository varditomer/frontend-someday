<template>
    <section class="task-preview">
        <div class="top-sec">
            <p>{{ task.title }}</p>
        </div>
        <div class="persons">
            <span v-svg-icon="'smallPerson'" class="person-icon"></span>
            <p class="person-text">Person</p>
            <div class="task-persons">
                <span v-if="task.person?.length" v-for="person in task.person" class="task-avatar">
                    <img :src="person.imgUrl" alt="">
                </span>
                <span v-else v-svg-icon="'smallPerson'" class="task-avatar default"></span>
            </div>
        </div>
        <div class="label">
            <span v-svg-icon="'status'"></span>
            <p class="label-text">Status</p>
            <div :style="`background-color:${task.color}`" class="label">{{ task.title }}
            </div>
        </div>
    </section>
</template>

<script>
export default {

    name: '',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false,
            beingDragged: false,
        }
    },
    methods: {
        saveBoard() {
            const board1 = JSON.parse(JSON.stringify(this.$store.getters.board))
            // board1.kanbanOrder = this.statuses //.map(status => status._id)

            // this.$store.dispatch({ type: 'saveBoard', board: board1 })
            // console.log(this.labeles)
        },
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
    },
    created() {
        console.log(`this.group`, this.group)
    },
    computed: {
    },
    components: {
    },
}
</script>
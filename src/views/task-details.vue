<template>

    <section v-click-outside="close" class='task-details-container'>
        <span v-if="taskToEdit" @click="close" v-svg-icon="'exit'" class="close-modal-btn"></span>
        <h1 v-if="taskToEdit" class="task-modal-title">{{ taskToEdit.title }}</h1>
        <div v-if="taskToEdit" class="modal-btns">
            <div>
                <span v-svg-icon="'outlineHome'"></span>
                <button class="task-comments-btn">Updates</button>
            </div>
            <span>|</span>
            <div>
                <span></span>
                <button>Files</button>
            </div>
            <span>|</span>
            <div>
                <span></span>
                <button>Activity Log</button>
            </div>
        </div>
        <section v-if="taskToEdit" class="task-comments">
            <form @submit.prevent="">
                <textarea v-model="commentToAdd" type="text" placeholder="Write an update..." class="comment-add-txt" />
                <button @click="" class="add-comment-btn">Update</button>
            </form>
            <div v-for="comment in taskToEdit.comments" v-if="taskToEdit.comments" class="comment">
                <div class="comment-profile">
                    <img :src="comment.byMember.imgUrl" alt="">
                    <p>{{ comment.byMember.fullname }}</p>
                </div>
                <div class="comment-options">
                    <span v-svg-icon="'time'"></span>
                    <p>3h</p>
                    <span v-svg-icon="'more'"></span>
                </div>
                <div class="comment-content">{{ comment.txt }}</div>
                <div class="comment-reactions"></div>
                <div class="comment-like">
                    <div>
                        <span v-svg-icon="'like'"></span>
                        <button>Like</button>
                    </div>
                </div>
                <div class="comment-reply">
                    <div>
                        <span v-svg-icon="'reply'"></span>
                        <button>Reply</button>
                    </div>
                </div>
            </div>
        </section>
    </section>

</template>
<script>
export default {
    name: 'task-details',
    data() {
        return {
            commentToAdd: '',
            taskToEdit: null
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    methods: {
        close() {
            this.$router.push('/board/' + this.board._id)
        }
    },
    created() {
        const { taskId } = this.$route.params
        setTimeout(() => {
            this.board.groups.some(({ tasks }) => tasks.some(task => {
                if (task._id === taskId) this.taskToEdit = task
            }))
        }, 500)
    }
}
</script>
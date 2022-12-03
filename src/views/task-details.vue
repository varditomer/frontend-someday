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
            <form @submit.prevent="addComment">
                <textarea v-model="commentToAdd" type="text" placeholder="Write an update..." class="comment-add-txt" />
                <button @click="" class="add-comment-btn">Update</button>
            </form>
            <div v-for="comment in taskToEdit.comments" v-if="taskToEdit.comments" class="comment">
                <div class="comment-profile">
                    <img v-if="comment.byMember.imgUrl" :src="comment.byMember.imgUrl" alt="">
                    <div v-else class="guest-profile-pic">G</div>
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

    methods: {
        close() {
            this.$router.push('/board/' + this.board._id)
        },
        addComment() {
            const comment = {
                txt: this.commentToAdd,
                taskId: this.taskToEdit._id,
                createdAt: Date.now(),
                _id: 'HardCodedIdForNow',
                byMember: {
                    _id: 0,
                    fullname: 'Guest'
                }
            }
            const task = JSON.parse(JSON.stringify(this.taskToEdit))
            if (!task.comments) task.comments = []
            task.comments.unshift(comment)
            if (!this.taskToEdit.comments) this.taskToEdit.comments = []
            this.taskToEdit.comments.unshift(comment)
            this.$store.dispatch({ type: 'saveTask', task })
            this.commentToAdd = ''
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    async created() {
        const { taskId } = this.$route.params
        const { id } = this.$route.params
        await this.$store.dispatch({ type: 'queryBoard', id })
        this.board.groups.some(({ tasks }) => tasks.some(task => {
            if (task._id === taskId) this.taskToEdit = JSON.parse(JSON.stringify(task))
        }))

    }
}
</script>
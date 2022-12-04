<template>

    <section v-click-outside="close" class='task-details-container'>
        <span v-if="taskToEdit" @click="close" v-svg-icon="'exit'" class="close-modal-btn"></span>
        <h1 v-if="taskToEdit" class="task-modal-title">{{ taskToEdit.title }}</h1>
        <div v-if="taskToEdit" class="modal-btns">
            <div :class="{ 'selected': showUpdates }">
                <span v-svg-icon="'outlineHome'"></span>
                <button @click="goToUpdates" class="task-comments-btn">Updates</button>
            </div>
            <span>|</span>
            <div :class="{ 'selected': showFiles }">
                <span></span>
                <button @click="goToFiles">Files</button>
            </div>
            <span>|</span>
            <div>
                <span></span>
                <button>Activity Log</button>
            </div>
        </div>
        
        <section v-if="(taskToEdit && showUpdates)" class="task-comments">
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

        <section v-if="showFiles" class="upload-files flex center">
            <section class="img-upload flex column center" :class="{ 'drag-zone': isDragover }" @drop.prevent="handleFile"
                @dragover.prevent="isDragover = true" @dragleave="isDragover = false">

                <label v-if="!isLoading" :class="{ drag: isDragover }">
                    <upload-icon :class="{ drag: isDragover }" />
                    <input type="file" @change="handleFile" hidden />
                </label>

                <img v-else src="../assets/loader.gif" alt="" />
                <img class="empty-state-image" src="https://cdn.monday.com/images/files-gallery/empty-state.png" />

                <div class="cta-container flex column center">
                    <div class="cta-container-title">
                        <b>Drag &amp; drop</b>&nbsp;or&nbsp;<b>add files here</b>
                    </div>
                    <div class="cta-container-subtitle">Upload, comment and review all files in this item to easily collaborate in context</div>
                    <button type="button" class="monday-style-button monday-style-button--size-medium monday-style-button--kind-primary monday-style-button--color-primary has-style-size" data-testid="button" aria-disabled="false" aria-busy="false" style="--element-width:113.672px; --element-height:40px;">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component monday-style-button--left-icon icon_component--no-focus-style"><path d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>Add file
                    </button>
                </div>


            </section>

        </section>

    </section>

</template>
<script>
export default {
    name: 'task-details',
    data() {
        return {
            commentToAdd: '',
            taskToEdit: null,
            showUpdates: null,
            showFiles: null,
        }
    },
    async created() {
        this.showUpdates = true
        const { taskId } = this.$route.params
        const { id } = this.$route.params
        await this.$store.dispatch({ type: 'queryBoard', id })
        this.board.groups.some(({ tasks }) => tasks.some(task => {
            if (task._id === taskId) this.taskToEdit = JSON.parse(JSON.stringify(task))
        }))

    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    methods: {
        goToFiles() {
            this.showUpdates = false
            this.showFiles = true
        },
        goToUpdates() {
            this.showFiles = false
            this.showUpdates = true
        },


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

}
</script>
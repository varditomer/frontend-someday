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

        <section v-if="showFiles" class="upload-files flex column align-center">
            <div class="sub-header">

            </div>
            <section class="img-upload flex column center" :class="{ 'drag-zone': isDragover }"
                @drop.prevent="handleFile" @dragover.prevent="isDragover = true" @dragleave="isDragover = false">

                <div v-if="(!isLoading && !imgUrls.length)" :class="{ drag: isDragover }"
                    class="cta-container flex column center">
                    <div class="files-gallery-cmp flex column center">


                        <img class="empty-state-image"
                            src="https://cdn.monday.com/images/files-gallery/empty-state.png" />
                        <div class="cta-container-title">
                            <b>Drag &amp; drop</b>&nbsp;or&nbsp;<b>add files here</b>
                        </div>
                        <div class="cta-container-subtitle">Upload, comment and review all files in this item to easily
                            collaborate in context
                        </div>
                        <button class="add-file-btn flex center">
                            <span v-svg-icon="'add'"></span>
                            <div>Add file</div>
                        </button>

                        <!-- <upload-icon :class="{ drag: isDragover }" /> -->
                        <input type="file" @change="handleFile" hidden />
                    </div>
                </div>
                <img v-else src="../assets/loader.gif" alt="" />



                <img-list v-if="imgUrls.length" :imgUrls="imgUrls" @setImg="setImg" />



            </section>

        </section>

    </section>

</template>
<script>

import { uploadImg } from '../services/img-upload.service'
import { imgService } from '../services/img-service'
import imgList from '../cmps/img-list.cmp.vue'


export default {
    name: 'task-details',
    data() {
        return {
            commentToAdd: '',
            taskToEdit: null,
            showUpdates: null,
            showFiles: null,
            imgUrls: [],
            imgToShow: '',
            isLoading: false,
            isDragover: false
        }
    },
    async created() {
        this.showUpdates = true
        this.imgUrls = imgService.getImgs()
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

        handleFile(ev) {
            console.log('ev', ev)
            let file
            if (ev.type === 'change') file = ev.target.files[0]
            else if (ev.type === 'drop') file = ev.dataTransfer.files[0]
            this.onUploadFile(file)
        },
        async onUploadFile(file) {
            this.isLoading = true
            this.isDragover = false
            const res = await uploadImg(file)
            this.saveImg(res.url)
            this.isLoading = false
            console.log('res:', res)
        },


        saveImg(url) {
            this.imgUrls.push(url)
            imgService.saveImg(url)
        },
        setImg(url) {
            this.imgToShow = url
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
    components: {
        imgList,
    },

}
</script>
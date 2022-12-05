<template>
    <section class='task-opt-modal more-options-modal'>

        <div class="modal-group upper-group">
            <div class="modal-item flex align-center" @click="openTask">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'open'"></span>
                    <p class="title">Open</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="removeTask">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'delete'"></span>
                    <p class="title">Delete</p>
                </div>
            </div>
            <!-- <div class="modal-item flex align-center justify-between">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'moveTo'"></span>
                    <p>Move to</p>
                </div>
                <span v-svg-icon="'arrowLeft'"></span>
            </div>
            <div class="modal-item flex align-center justify-between">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'duplicate'"></span>
                    <p>Duplicate</p>
                </div>
                <span v-svg-icon="'arrowLeft'"></span>
            </div> -->
            <div class="modal-item flex align-center" @click="$emit('taskTitleToClipboard')">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'copyText'"></span>
                    <p>Copy Name</p>
                </div>
            </div>
            <!-- <div class="modal-item flex align-center">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'paste'"></span>
                    <p>Paste</p>
                </div>
            </div> -->
            <div class="modal-item flex align-center justify-between" @click="$emit('linkToClipboard')">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'link'"></span>
                    <p>Copy item link</p>
                </div>
                <span v-svg-icon="'commentCount'"></span>
            </div>
        </div>

        <!-- <div class="middle-group">
            <div class="modal-item flex align-center">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'subitem'"></span>
                    <p>Add subitem</p>
                </div>
            </div>
            <div class="modal-item flex align-center justify-between">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'convert'"></span>
                    <p>Convert to subitem</p>
                </div>
                <span v-svg-icon="'arrowLeft'"></span>
            </div>
            <div class="modal-item flex align-center">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'add'"></span>
                    <p>Create new item below</p>
                </div>
            </div>
        </div> -->

        <!-- <div class="bottom-group">
            <div class="modal-item flex align-center">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'archive'"></span>
                    <p>Archive</p>
                </div>
            </div>
        
        </div> -->

    </section>
</template>
<script>
export default {
    name: 'task-opt-modal',
    emits: ['openTask', 'removeTask', 'linkToClipboard', 'taskTitleToClipboard'],
    props: {},
    data() {
        return {}
    },
    created() { },
    computed: {},
    methods: {
        openTask() {
            this.$emit('openTask')
        },
        removeTask() {
            this.$emit('removeTask')
        }
    },
    components: {}
}
</script>
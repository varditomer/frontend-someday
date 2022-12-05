<template>

    <section class='group-opt-modal more-options-modal'>

        <div class="modal-group upper-group flex column justify-center">
            <div class="modal-item flex align-center" @click="collapseGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'collapse'"></span>
                    <p class="title">Collapse this group</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="collapseAllGroups">
                <div class="flex align-center">
                    <span v-svg-icon="'collapse'"></span>
                    <p class="title">Collapse all groups</p>
                </div>
            </div>
        </div>

        <div class="modal-group upper-group flex column justify-center">
            <div class="modal-item flex align-center" @click="addGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'add'"></span>
                    <p class="title">Add group</p>
                </div>
            </div>
            <!-- <div class="modal-item flex align-center" @click="duplicateGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'board'"></span>
                    <p class="title">Duplicate this group</p>
                </div>
            </div> -->
        </div>

        <div class="modal-group lowest-group flex column justify-center">
            <div class="modal-item flex align-center" @click="editGroupTitle">
                <div class="flex align-center">
                    <span v-svg-icon="'board'"></span>
                    <p class="title">Rename group</p>
                </div>
            </div>
            <!-- <div class="modal-item flex align-center" @click="changeGroupColor">
                <div class="flex align-center">
                    <span v-svg-icon="'board'"></span>
                    <p class="title">Change group color</p>
                </div>
            </div> -->
            <div class="modal-item flex align-center delete-group" @click="removeGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'delete'"></span>
                    <p class="title">Delete</p>
                </div>
            </div>
        </div>

    </section>

</template>
<script>
import { eventBus } from '../../services/event-bus.service';
export default {
    name: 'group-opt-modal',
    emits: ['addGroup', 'editGroupTitle', 'removeGroup'],
    props: {
        groupId: String,
    },
    data() {
        return {}
    },
    created() { },
    computed: {},
    methods: {
        addGroup() {
            this.$emit('addGroup')
        },
        collapseAllGroups() {
            console.log(`im here:`,)
            eventBus.emit('collapse-groups', true)
        },
        collapseGroup() {
            console.log(`im here:`,)
            eventBus.emit('collapse-single-group', { _id: this.groupId, collapseGroup: true })
        },
        editGroupTitle() {
            this.$emit('editGroupTitle')
        },
        removeGroup() {
            this.$emit('removeGroup')
        }
    },
    components: {}
}
</script>
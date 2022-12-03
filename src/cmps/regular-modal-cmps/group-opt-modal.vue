<template>

    <section class='group-opt-modal'>
        <div class="modal-group upper-group">
            <div class="modal-item flex align-center" @click="addGroup">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'board'"></span>
                    <p class="title">Add new group</p>
                </div>
            </div>
        </div>
    </section>

</template>
<script>
export default {
    name: 'group-opt-modal',
    props: {},
    data() {
        return {}
    },
    created() { },
    computed: {},
    methods: {
        addGroup() {
            this.$emit('addGroup')
        }
    },
    components: {}
}
</script>
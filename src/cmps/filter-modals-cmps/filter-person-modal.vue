<template>
    <section class='filter-person-modal'>
        <div class="modal-group upper-group flex column">
            <div class="modal-item flex align-center">
                <p class="title">Quick person filter</p>
            </div>
            <div class="modal-item flex align-center">
                <p class="subtitle">Filter items and subitems by person</p>
            </div>
            <div class="modal-item flex align-center">
                <div @click="filterPerson(user._id)" :title="user.fullname" class="filter-user" v-for="user in users">
                    <img :src="user.imgUrl" alt="">
                </div>
            </div>
        </div>

    </section>
</template>
<script>
export default {
    name: 'filter-person-modal',
    emits: ['filter'],
    props: {
        users: Array,
    },
    data() {
        return {
            filterBy: {
                userId: []
            }
        }
    },
    methods: {
        filterPerson(userId) {
            this.filterBy.userId = userId
            this.$emit('filter', { ...this.filterBy })
        }
    }
}
</script>
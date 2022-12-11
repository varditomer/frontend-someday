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
                <div v-for="user in formattedUsers" @click="filterPerson(user._id)" :title="user.fullname"
                    :class="{ 'selected': filterBy?.userId === user._id }" class="filter-user">
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
        filterBy: Object
    },
    data() {
        return {
            filter: {
                userId: []
            },
            isSelected: []
        }
    },
    methods: {
        filterPerson(userId) {
            this.isSelected = !this.isSelected
            this.filter.userId = userId
            this.$emit('filter', { ...this.filter })
        }
    },
    computed: {
        formattedUsers() {
            return this.users.filter(user => !user.isGuest)
        }
    }
}
</script>
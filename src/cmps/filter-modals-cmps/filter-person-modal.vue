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
                <div v-for="user in users" @click="togglePersonFilter(user._id)" :title="user.fullname"
                    :class="{ 'selected': filter?.userId?.includes(user._id) }" class="filter-user">
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
        filter: Object
    },
    data() {
        return {
            userId: []
        }
    },
    methods: {
        togglePersonFilter(userId) {
            const idx = this.userId.indexOf(userId)
            if (idx === -1) this.userId.push(userId)
            else this.userId.splice(idx, 1)
            this.$emit('filter', 'person', [...userId])
        }
    },
    computed: {
        formattedUsers() {
            return this.users.filter(user => !user.isGuest)
        }
    },
    created() {
        // console.log(`this.filter`, this.filter)
    }
}
</script>
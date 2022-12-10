<template>
    <nav class="main-nav flex column align-center justify-between">
        <section class="top-nav flex column center">
            <router-link to="/">
                <img class="logo" src="../assets/imgs/logo.svg" alt="">
            </router-link>
            <router-link :to="('/board/' + board._id)">
                <span v-svg-icon="'coloredBoard'"></span>
            </router-link>
        </section>
        <section class="bottom-nav">
            <img class="profile" v-if="loggedinUser" :src="loggedinUser.imgUrl" alt="">
        </section>
    </nav>
</template>

<script>
export default {
    name: 'task-nav',
    computed: {
        board() {
            return this.$store.getters.board
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    created() {
    },
}
</script>

<style>
.icon {
    width: 50px;
    height: 50px;
}
</style>
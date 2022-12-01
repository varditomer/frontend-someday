<template>
    <nav class="main-nav flex column align-center justify-between">
        <section class="top-nav flex column center">
            <router-link to="/">
                <img class="logo" src="../assets/imgs/logo.svg" alt="">
            </router-link>
            <router-link :to="('/board/' + firstBoardId)">
                <span v-svg-icon="'coloredBoard'"></span>
            </router-link>
        </section>
        <section class="bottom-nav">
            <div class="profile">G</div>
        </section>
    </nav>
</template>

<script>
export default {
    name: 'task-nav',
    computed: {
        firstBoardId() {
            return this.$store.getters.firstBoardId
        }
    }
}
</script>

<style>
.icon {
    width: 50px;
    height: 50px;
}
</style>
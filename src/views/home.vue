<template>
  <section class="container home text-center">
    <img class="hero" src="src/assets/imgs/hero.jpg" alt="">
    <h1 class="hero-title">A platform built for<br>a new way of working</h1>
    <p class="hero-subtitle">What would you like to manage with someday.com Work OS?</p>
    <router-link :to="('/board/' + board._id)">
      <button class="hero-btn">Start demo</button>
    </router-link>
  </section>


</template>

<script>
export default {
  name: 'home',
  computed: {
    board() {
      return this.$store.getters.board
    }
  },

}
</script>

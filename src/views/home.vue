<template>
  <section class="container home text-center">
    <img class="hero" src="src/assets/imgs/hero.jpg" alt="">
    <h1 class="hero-title">A platform built for<br>a new way of working</h1>
    <p class="hero-subtitle">What would you like to manage with someday.com Work OS?</p>
    <div class="home-nav-btns flex column center">
      <router-link :to="('/board/' + board._id)">
        <button class="hero-btn">Start demo now</button>
      </router-link>

      <div v-if="!signedIn" class="login-signup-area flex">
        <button class="login-signup hero-btn" @click="(openLoginSignupModal = true)">Login / Signup</button>
        <triangle-modal v-if="(openLoginSignupModal && !hideModal)" :cmp="`login-signup-modal`" />
      </div>

    </div>
  </section>


</template>

<script>
import triangleModal from '../cmps/dynamic-modals/triangle-modal.vue';
export default {
  name: 'home',
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  data() {
    return {
      openLoginSignupModal: false,
      signedIn: false,
      hideModal: false
    }
  },
  methods: {
    closeLoginSignupModal() {
      this.openLoginSignupModal = false
    },
  },
  components: {
    triangleModal
  }
}
</script>

<template>
  <section class="container home text-center">
    <img class="hero" src="/src/assets/imgs/hero.jpg" alt="">

    <header class="main-header">
      <img class="logo" src="/src/assets/imgs/logo.svg" alt="">
      <nav class="main-nav">

        <GoogleLogin :callback="callback">
          <img class="google-img" src="/src/assets/imgs/google.png" alt="">
        </GoogleLogin>
        
        <div class="login-signup-container">
          <button class="login-btn" @click="(showModal = true)">Log in</button>
          <triangle-modal @loginSignup="loginSignup" @hideModal="(showModal = false)" v-if="(showModal)"
            :cmp="`login-signup-modal`" />
        </div>

        <router-link :to="('/board/' + board._id)">
          <button class="cta-btn">
            <p>Get started</p>
          </button>
        </router-link>
      </nav>
    </header>



    <h1 class="hero-title">A platform built for<br>a new way of working</h1>
    <p class="hero-subtitle">Watch what you can manage with someday.com Work OS</p>
    <div class="home-nav-btns flex column center">
      <router-link :to="('/board/' + board._id)">
        <button class="hero-btn">
          <p>Get started</p>
        </button>
      </router-link>
    </div>
  </section>


</template>

<script>
import triangleModal from '../cmps/dynamic-modals/triangle-modal.vue';
import { decodeCredential } from 'vue3-google-login'

export default {
  name: 'home',
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  data() {
    return {
      signedIn: false,
      showModal: false,
      profile: null,
      login: null
    }
  },
  methods: {
    closeLoginSignupModal() {
      this.openLoginSignupModal = false
    },
    callback(response) {
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      console.log("Handle the response", response)
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)
    },
    async loginSignup(userCreds) {

      if (!userCreds.email) {
        try {
          console.log(`userCreds:`, userCreds)
          await this.$store.dispatch({ type: 'login', userCreds })
          this.$router.push('/board/' + this.board._id)
        }
        catch (err) {
          console.log('Wrong details', err);
        }
      }
      else {
        try {
          await this.$store.dispatch({ type: 'signup', userCreds })
          this.$router.push('/board/' + this.board._id)
        }
        catch (err) {
          console.log('Could not sign up', err);
        }
      }
    },
    async handleCredentialResponse(ev) {
      console.log('bab');
      gapi.auth2.GoogleAuth.then(res => console.log(res))
    }
  },
  signup() {

  },
  components: {
    triangleModal
  }
}
</script>
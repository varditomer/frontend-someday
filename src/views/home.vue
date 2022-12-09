<template>
  <section class="container home text-center">
    <img class="hero" src="src/assets/imgs/hero.jpg" alt="">


    <!-- <div id="g_id_onload" data-client_id="856304661727-9s62u14qk5du0dmc3n12eeiah47o8j26.apps.googleusercontent.com"
      data-callback="handleCredentialResponse">
    </div>
    <div class="g_id_signin" data-type="standard"></div> -->


    <h1 class="hero-title">A platform built for<br>a new way of working</h1>
    <p class="hero-subtitle">What would you like to manage with someday.com Work OS?</p>
    <div class="home-nav-btns flex column center">
      <router-link :to="('/board/' + board._id)">
        <button class="hero-btn">Start demo now</button>
      </router-link>
      <div v-if="!signedIn" class="login-signup-area flex">
        <button class="login-signup hero-btn" @click="(showModal = true)">Login / Signup</button>
        <triangle-modal @login="login" @hideModal="(showModal=false)" v-if="(showModal)" :cmp="`login-signup-modal`" />
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
      signedIn: false,
      showModal: false,
      profile: null
    }
  },
  methods: {
    closeLoginSignupModal() {
      this.openLoginSignupModal = false
    },
    async login(userCreds) {
      if (!userCreds.email) {
        try {
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
  components: {
    triangleModal
  }
}
</script>

<!-- function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
} -->

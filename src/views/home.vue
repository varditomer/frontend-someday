<template>

  <section class="container home text-center">
    <img class="hero" src="/src/assets/imgs/hero.jpg" alt="">

    <header class="main-header">
      <div class="logo-container">
        <img class="logo" src="/src/assets/imgs/logo.svg" alt="">
        <h1>someday<span>.com</span></h1>
      </div>
      <nav class="main-nav">

        <!-- <GoogleLogin class="google-img"  :callback="callback">
        </GoogleLogin> -->
        <!-- <img class="google-img" src="/src/assets/imgs/google.png" alt=""> -->

        <div class="login-signup-container">
          <router-link to="/login">
            <button class="login-btn" @click="(showModal = true)">Log in</button>
          </router-link>
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
          <p>Have a look</p>
        </button>
      </router-link>
    </div>
  </section>

</template>

<script>

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
      profile: null,
      login: null
    }
  },
  methods: {
    callback(response) {
      console.log(`1:`,)
      console.log(`response:`, response)
      console.log(`response.credential:`, response.credential)
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      const userData = decodeCredential(response.credential)
      console.log(`userData:`, userData)
      // try {
      //     console.log(`userCreds:`, userCreds)
      //     // await this.$store.dispatch({ type: 'loginGoogle', userCreds })
      //     // this.$router.push('/board/' + this.board._id)
      //   }
      //   catch (err) {
      //     console.log('Something went wrong', err);
      //   }

    },
    async handleCredentialResponse(ev) {
      console.log('bab');
      gapi.auth2.GoogleAuth.then(res => console.log(res))
    }
  },
}
</script>
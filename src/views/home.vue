<template>
  <section class="container home text-center">
    <h1>Home Page</h1>
    <h5 class="text-center">
      Powered up Frontend
    </h5>
    <router-link :to="('/board/' + firstBoardId)">
      <button>Start demo</button>
    </router-link>
  </section>


</template>

<script>
export default {
  name: 'home',
  computed: {
    firstBoardId() {
      return this.$store.getters.firstBoardId
    }
  },

}
</script>

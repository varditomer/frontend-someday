<template>
  <router-view :key="$route.path" />
</template>

<script>

export default {
  async created() {

    console.log('APP CREATED');
    const filter = { id: this.$route.params.id }
    await this.$store.dispatch({ type: 'loadUsers' })
    await this.$store.dispatch({ type: 'queryBoard', filter })
    this.$store.commit({ type: 'setWorkspaceState' })
  }
}
</script>
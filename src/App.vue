<template>
  <router-view :key="$route.path" />
  <user-msg />
</template>

<script>
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {
  async created() {
    const filter = { id: this.$route.params.id }
    await this.$store.dispatch({ type: 'loadUsers' })
    await this.$store.dispatch({ type: 'queryBoard', filter })
    this.$store.commit({ type: 'setWorkspaceState' })
    let user = userService.getLoggedinUser()
    this.$store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg
  },
}
</script>
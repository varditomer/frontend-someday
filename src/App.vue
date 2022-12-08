<template>
  <router-view :key="$route.path" />
  <user-msg />
</template>

<script>
import { store } from './store/store'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {
  async created() {
    await this.$store.dispatch({ type: 'queryBoard', filter: { id: this.$route.params.id } })
    this.$store.commit({ type: 'setWorkspaceState' })
    await this.$store.dispatch({ type: 'loadGroups' })
    await this.$store.dispatch({ type: 'loadStatuses' })

    // await this.$store.dispatch({type: 'loadColors'})
    await this.$store.dispatch({ type: 'loadUsers' })
    let user = userService.getLoggedinUser()
    this.$store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg
  },
}
</script>
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
    this.$store.dispatch({ type: 'loadGroups' })
    this.$store.dispatch({ type: 'getFirstBoardId' })
    this.$store.dispatch({ type: 'loadUsers' })
    await this.$store.dispatch({ type: 'loadGroups' }) 
    // console.log(`this.$store.getters.group`, this.$store.getters.group)
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg
  },
}
</script>
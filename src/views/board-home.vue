<template>

</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import taskNav from '../cmps/task-nav.vue'
import taskWorkspace from '../cmps/board-workspace.vue'
import taskHeader from '../cmps/board-header.vue'
import taskFilter from '../cmps/board-filter.vue'

export default {
  data() {
    return {
      boardToAdd: {}
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    tasks() {
      return this.$store.getters.tasks
    }
  },
  methods: {
    async addTask() {
      try {
        await this.$store.dispatch({ type: 'addTask', task: this.taskToAdd })
        showSuccessMsg('Task added')
        this.taskToAdd = taskService.getEmptyTask()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add task')
      }
    },
    async removeTask(taskId) {
      try {
        await this.$store.dispatch(getActionRemoveTask(taskId))
        showSuccessMsg('Task removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove task')
      }
    },
    async updateTask(task) {
      try {
        task = { ...task }
        task.price = +prompt('New price?', task.price)
        await this.$store.dispatch(getActionUpdateTask(task))
        showSuccessMsg('Task updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update task')
      }
    },
    async addTaskMsg(taskId) {
      try {
        await this.$store.dispatch(getActionAddTaskMsg(taskId))
        showSuccessMsg('Task msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add task msg')
      }
    },
  },
  components: {
    taskNav,
    taskWorkspace,
    taskHeader,
    taskFilter
  }


}
</script>

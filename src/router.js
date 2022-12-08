import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import boardHome from './views/board-home.vue'
import boardApp from './views/board-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import taskDetails from './views/task-details.vue'
import kanbanApp from './views/kanban-app.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board/',
    name: 'board-home',
    component: boardHome,
  },
  {
    path: '/board/:id/',
    name: 'board-app',
    component: boardApp,
    children: [
      {
        path: 'task/:taskId',
        component: taskDetails
      }
    ]
  },
  {
    path: '/board/:id/kanban',
    name: 'board-kanban',
    component: kanbanApp
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})


import { createApp } from 'vue'


import { router } from './router.js'
import { store } from './store/store.js'
import copyText from "@meforma/vue-copy-to-clipboard";



import {
    focusDirective,
    condFocusDirective,
    customOnDirective,
    clickOutsideDirective,
    svgIconDirective,
} from './directives'


import './assets/styles/main.scss'
// import '../dist/assets/index.45718cf5.css'
import App from './App.vue'

const app = createApp(App)

app.directive('focus', focusDirective)
app.directive('cond-focus', condFocusDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)
app.directive('svg-icon', svgIconDirective)

app.use(router)
app.use(store)
app.use(copyText)

app.mount('#app')


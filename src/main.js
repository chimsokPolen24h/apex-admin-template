import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import './assets/main.css'
import './assets/style.css'
import router from './router'

const app = createApp(App)

app.component('Icon', Icon)
app.use(router)
app.mount('#app')
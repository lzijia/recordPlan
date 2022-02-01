import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import axios from 'axios'
import Base64 from "js-base64"
const app = createApp(App)
app.use(router).mount('#app')
app.config.globalProperties.$axios = axios
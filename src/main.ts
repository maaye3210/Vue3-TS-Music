import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/base.scss'
import '@/assets/theme.scss'
import App from './App.vue'
import router from './router'
import "@/utils/extend"
import 'font-awesome-animation'//引入动效库
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

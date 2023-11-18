import App from '@/App.vue'
import naive from 'naive-ui'
import { createApp } from 'vue'

const app = createApp(App)
app.use(naive)
app.mount('#app')

import App from '@/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'

const app = createApp(App)
app.use(Antd)

app.mount('#app')

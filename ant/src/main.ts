import App from '@/App.vue'
import { Button, Col, Dropdown, Menu, Row } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'

const app = createApp(App)
app.use(Button)
app.use(Dropdown)
app.use(Menu)
app.use(Row)
app.use(Col)

app.mount('#app')

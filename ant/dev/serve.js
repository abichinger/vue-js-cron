import { Button, Col, Dropdown, Menu, MenuItem, Row } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(Button)
app.use(Dropdown)
app.use(Menu)
app.use(MenuItem)
app.use(Row)
app.use(Col)

app.mount('#app')

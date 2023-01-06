import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'

const app = createApp(App)
app.use(Quasar)

app.mount('#app')

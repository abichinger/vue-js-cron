import App from '@/App.vue'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import 'vuetify/styles'

const app = createApp(App)
const vuetify = createVuetify({
  components,
})
app.use(vuetify)

app.mount('#app')

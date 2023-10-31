import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import 'vuetify/styles'
import example from './example-usage.vue'

const app = createApp(example)
const vuetify = createVuetify({
  components,
})
app.use(vuetify)

app.mount('#app')

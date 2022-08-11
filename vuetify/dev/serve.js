import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import example from './example-usage.vue'

Vue.use(Vuetify)
const opts = {
  icons: {
    iconfont: 'mdi',
  },
}
const vuetify = new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
  render: h => h(example),
  vuetify
}).$mount('#app')
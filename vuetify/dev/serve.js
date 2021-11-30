import Vue from 'vue'
import example from './example-usage.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {}
const vuetify = new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
  render: h => h(example),
  vuetify
}).$mount('#app')
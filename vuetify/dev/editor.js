import Vue from 'vue'
import Editor from './editor.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {}
const vuetify = new Vuetify(opts)

Vue.config.productionTip = false

new Vue({
  render: h => h(Editor),
  vuetify
}).$mount('#app')
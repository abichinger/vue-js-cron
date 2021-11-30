import Vue from 'vue'
import example from './example-usage.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(example),
}).$mount('#app')
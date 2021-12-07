import CronCore from '@vue-js-cron/core'
import CronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import CronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Vuetify);
  options.vuetify = new Vuetify({})
  Vue.use(CronCore);
  Vue.use(CronVuetify);
  Vue.use(CronLight)
}

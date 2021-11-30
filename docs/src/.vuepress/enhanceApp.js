import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import CronCore from '@vue-js-cron/core'
import CronVuetify from '@vue-js-cron/vuetify'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@vue-js-cron/vuetify/dist/dist/vuetify.min.css"

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Vuetify);
  options.vuetify = new Vuetify({})
  Vue.use(Buefy)
  Vue.use(CronCore);
  Vue.use(CronVuetify);
}

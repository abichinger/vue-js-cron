import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setup } from './setup'

async function main() {
  const app = createApp(App)
  const flavor = import.meta.env.VITE_FLAVOR
  await setup(flavor, app)
  app.mount('#app')
}

main()

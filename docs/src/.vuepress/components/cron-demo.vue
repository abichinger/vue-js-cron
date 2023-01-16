<template>
  <div class="cron-demo">
    <p>Flavor</p>
    <v-btn-toggle
        v-model="text"
        tile
        color="secondary"
        group
        density="compact"
        class="mb-2 elevation-5">

        <v-btn v-for="item in flavors" :value="item.name" :key="item.name" @click="flavor = item">
          {{item.name}}
        </v-btn>

    </v-btn-toggle>

    <p>Locale</p>
    <v-btn-toggle
        v-model="locale"
        tile
        color="secondary"
        group
        density="compact"
        class="mb-10 elevation-5">

        <v-btn v-for="item in locales" :value="item" :key="item">
          {{item}}
        </v-btn>

    </v-btn-toggle>

    <p class="mb-2">
      <template v-for="l in locales" :key=l>
        <component v-if="l == locale" :is="flavor.component" v-model="value" :locale="locale"></component>
      </template>
    </p>
    <p class="text-lightest mb-5">
      cron expression: {{value}}
    </p>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const flavors = [
      {
        name: 'Light',
        component: 'cron-light'
      },
      {
        name: 'Vuetify',
        component: 'cron-vuetify'
      },
      {
        name: 'Element Plus',
        component: 'cron-element-plus'
      },
      {
        name: 'Ant',
        component: 'cron-ant'
      }
    ]

    const locales = ['en', 'de', 'pt','es']

    const flavor = flavors[0]

    const selectFlavor = (name) => {
      let i = flavors.map(f => f.name).indexOf(name)
      i = i >= 0 ? i : 0
      return flavors[i]
    }

    return {
      flavor: ref(flavor),
      flavors,
      selectFlavor,
      text: ref(flavor.name),
      locales,
      locale: ref('en'),
      value: ref('* * * * *')
    }
  }
}
</script>

<template>
  <div class="cron-demo">
    <p>Flavor</p>
    <v-btn-toggle
        v-model="toggle"
        tile
        color="secondary"
        group
        density="compact"
        class="mb-5 elevation-5"
        mandatory>

        <v-btn v-for="item in flavors" :key="item.name" @click="flavor = item">
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
        class="mb-5 elevation-5">

        <v-btn v-for="item in locales" :value="item" :key="item">
          {{item}}
        </v-btn>
    </v-btn-toggle>

    <p>Format</p>
    <v-btn-toggle
        v-model="format"
        tile
        color="secondary"
        group
        density="compact"
        class="mb-5 elevation-5">

        <v-btn v-for="item in formats" :value="item" :key="item">
          {{item}}
        </v-btn>

    </v-btn-toggle>

    <v-switch v-model="disabled" color="secondary" label="Disabled"></v-switch>

    <iframe :src="src"></iframe>

  </div>
</template>

<script>
import { withBase, } from '@vuepress/client'
import { computed, ref } from 'vue'

export default {
  setup (props) {
    const flavors = [
      {
        name: 'Light',
      },
      
      {
        name: 'Ant',
      },
      {
        name: 'Element Plus',
      },
      {
        name: 'Naive UI',
      },
      {
        name: 'Quasar',
      },
      {
        name: 'Vuetify',
      },
    ]
    const locales = ['en', 'de', 'pt', 'es', 'da', 'zh-cn']
    const formats = ['crontab', 'quartz']
    
    const flavor = ref(flavors[0])
    const locale = ref('en')
    const format = ref(formats[0])
    const disabled = ref(false)

    const selectFlavor = (name) => {
      let i = flavors.map(f => f.name).indexOf(name)
      i = i >= 0 ? i : 0
      return flavors[i]
    }

    const src = computed(() => {
      const params = {
        locale: locale.value,
        format: format.value,
        'initial-value': format.value == 'quartz' ? '* * * * * *' : '* * * * *',
        ...(disabled.value ? { disabled:true } : {})
      }
      const query = new URLSearchParams(params)
      const path = 'demo/' + flavor.value.name.replace(' ', '-').toLowerCase() + '/index.html?' + query.toString()
      
      return withBase(path)
    })

    return {
      src,
      flavor: flavor,
      flavors,
      selectFlavor,
      toggle: ref(0),
      locales,
      locale: locale,
      formats,
      format,
      disabled,
      value: ref('* * * * *')
    }
  }
}
</script>

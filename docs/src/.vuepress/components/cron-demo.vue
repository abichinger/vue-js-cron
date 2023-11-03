<template>
  <div class="cron-demo">
    <p>Flavor</p>
    <v-btn-toggle
        v-model="text"
        tile
        color="secondary"
        group
        density="compact"
        class="mb-5 elevation-5">

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
        class="mb-10 elevation-5">

        <v-btn v-for="item in formats" :value="item" :key="item">
          {{item}}
        </v-btn>

    </v-btn-toggle>

    <iframe :src="src"></iframe>

  </div>
</template>

<script>
import { withBase, } from '@vuepress/client'
import { computed, ref } from 'vue'

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    }
  },
  setup (props) {
    const flavors = [
      {
        name: 'Light',
      },
      {
        name: 'Vuetify',
      },
      {
        name: 'Element Plus',
      },
      {
        name: 'Ant',
      },
      {
        name: 'Quasar',
      }
    ]
    const locales = ['en', 'de', 'pt', 'es', 'da', 'zh-cn']
    const formats = ['crontab', 'quartz']
    
    const flavor = ref(flavors[props.index])
    const locale = ref('en')
    const format = ref(formats[0])

    const selectFlavor = (name) => {
      let i = flavors.map(f => f.name).indexOf(name)
      i = i >= 0 ? i : 0
      return flavors[i]
    }

    const src = computed(() => {
      const params = {
        locale: locale.value,
        format: format.value,
        'initial-value': format.value == 'quartz' ? '* * * * * *' : '* * * * *'
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
      text: ref(flavor.name),
      locales,
      locale: locale,
      formats,
      format,
      value: ref('* * * * *')
    }
  }
}
</script>

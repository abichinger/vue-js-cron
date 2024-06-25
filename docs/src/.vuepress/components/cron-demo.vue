<template>
  <div class="cron-demo">
    <p>Flavor</p>
    <v-select 
      :model-value="flavor"
      @update:model-value="selectFlavor" 
      :items="flavors" 
      item-value="name" 
      item-title="name">
    </v-select>

    <p>Locale</p>
    <v-select v-model="locale" :items="locales" item-title="name">
      <template #item="{ item, props }">
        <v-list-item v-bind="props" :subtitle="'locale: '+item.value"></v-list-item>
      </template>
    </v-select>

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
    const locales = [
      {
        name: 'English',
        value: 'en'
      },
      {
        name: 'German',
        value: 'de',
      },
      {
        name: 'Portuguese',
        value: 'pt',
      },
      {
        name: 'Spanish',
        value: 'es',
      },
      {
        name: 'Danish',
        value: 'da',
      },
      {
        name: 'Chinese',
        value: 'zh-cn',
      },
      {
        name: 'Hebrew',
        value: 'he',
      },
      {
        name: 'Russian (GPT-4)',
        value: 'ru',
      },
      {
        name: 'French (GPT-4)',
        value: 'fr',
      },
      {
        name: 'Japanese (GPT-4)',
        value: 'ja',
      },
      {
        name: 'Hindi (GPT-4)',
        value: 'hi',
      },
    ]
    locales.sort((a, b) => a.name.localeCompare(b.name))

    const formats = ['crontab', 'quartz']
    
    const flavor = ref(flavors[0])
    const locale = ref('en')
    const format = ref(formats[0])
    const disabled = ref(false)

    const selectFlavor = (name) => {
      let i = flavors.map(f => f.name).indexOf(name)
      i = i >= 0 ? i : 0
      flavor.value = flavors[i]
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

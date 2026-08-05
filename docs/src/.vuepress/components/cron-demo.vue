<template>
  <div class="cron-demo">
    <p class="pb-1">Flavor</p>
    <v-select v-model="flavor" :items="flavors" item-value="value" item-title="name" return-object>
    </v-select>

    <p class="pb-1">Locale</p>
    <v-select v-model="locale" :items="locales" item-title="name">
      <template #item="{ item, props }">
        <v-list-item v-bind="props" :subtitle="'locale: ' + item.value"></v-list-item>
      </template>
    </v-select>

    <p class="pb-1">Format</p>
    <v-btn-toggle
      v-model="format"
      tile
      color="secondary"
      group
      density="compact"
      class="mb-5 elevation-5"
    >
      <v-btn v-for="item in formats" :value="item" :key="item">
        {{ item.value }}
      </v-btn>
    </v-btn-toggle>

    <p>
      {{ format.value }} documentation: <a :href="format.docs">{{ format.docs }}</a>
    </p>

    <v-switch v-model="disabled" color="secondary" label="Disabled" hide-details></v-switch>
    <v-switch
      v-model="clearable"
      color="secondary"
      label="Clearable"
      hide-details
      class="pb-3"
    ></v-switch>

    <iframe :src="src"></iframe>
  </div>
</template>

<script>
import { withBase } from '@vuepress/client'
import { ref, watch } from 'vue'

export default {
  setup() {
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
        name: 'PrimeVue',
        value: 'prime',
      },
      {
        name: 'Quasar',
      },
      {
        name: 'Vuetify',
      },
    ].map((f) => ({
      name: f.name,
      value: f.value ?? f.name.replace(' ', '-').toLowerCase(),
    }))

    const locales = [
      {
        name: 'English',
        value: 'en',
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
      {
        name: 'Korean',
        value: 'ko',
      },
      {
        name: 'Italian',
        value: 'it',
      },
      {
        name: 'Ukrainian',
        value: 'uk',
      },
    ]
    locales.sort((a, b) => a.name.localeCompare(b.name))

    const formats = [
      { value: 'crontab', docs: 'https://man7.org/linux/man-pages/man5/crontab.5.html' },
      {
        value: 'quartz',
        docs: 'https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html',
      },
      {
        value: 'spring',
        docs: 'https://spring.io/blog/2020/11/10/new-in-spring-5-3-improved-cron-expressions',
      },
    ]

    const flavor = ref(flavors[0])
    const locale = ref('en')
    const format = ref(formats[0])
    const disabled = ref(false)
    const clearable = ref(true)
    const src = ref('')

    watch(
      [flavor, locale, format],
      () => {
        const params = {
          locale: locale.value,
          format: format.value.value,
          'initial-value': format.value.value == 'crontab' ? '* * * * *' : '* * * * * *',
          ...(disabled.value ? { disabled: true } : {}),
          ...(clearable.value ? { clearable: true } : {}),
        }
        const query = new URLSearchParams(params)
        const path = 'demo/' + flavor.value.value + '/index.html?' + query.toString()

        src.value = withBase(path)
      },
      { immediate: true },
    )

    watch([disabled, clearable], () => {
      const iframe = document.querySelector('iframe')
      if (iframe) {
        iframe.contentWindow?.postMessage(
          {
            type: 'updateProps',
            props: {
              disabled: disabled.value,
              clearable: clearable.value,
            },
          },
          '*',
        )
      }
    })

    return {
      src,
      flavor: flavor,
      flavors,
      toggle: ref(0),
      locales,
      locale: locale,
      formats,
      format,
      disabled,
      clearable,
      value: ref('* * * * *'),
    }
  },
}
</script>

<template>
  <n-config-provider :theme="theme">
    <main class="cron-demo" :dir="dir">
      <cron-editor v-bind="props" v-model="value"></cron-editor>
      <p>cron expression: {{ value }}</p>
    </main>
  </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { prefersDark } from './util'

export default defineComponent({
  components: {
    NConfigProvider,
  },
  setup() {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const props = Object.fromEntries(params.entries())

    const value = ref(params.get('initial-value') ?? '* * * * *')
    const theme = prefersDark() ? darkTheme : lightTheme
    const dir = ['he'].includes(params.get('locale') ?? '') ? 'rtl' : 'ltr'

    return {
      props: props,
      value: ref(value),
      theme,
      dir,
    }
  },
})
</script>

<style>
.cron-demo p {
  margin-top: 1rem;
}
</style>

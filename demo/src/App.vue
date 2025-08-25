<template>
  <main class="cron-demo" :class="{ dark: prefersDark() }" :dir="dir">
    <cron-editor v-bind="props" v-model="value"></cron-editor>
    <p>cron expression: {{ value }}</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { prefersDark } from './util'

export default defineComponent({
  setup() {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const props = Object.fromEntries(params.entries())

    const value = ref(params.get('initial-value') ?? '* * * * *')
    const dir = ['he'].includes(params.get('locale') ?? '') ? 'rtl' : 'ltr'

    return {
      props: props,
      value: ref(value),
      dir,
      prefersDark,
    }
  },
})
</script>

<style>
.cron-demo p {
  margin-top: 1rem;
}
</style>

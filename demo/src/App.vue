<template>
  <main class="cron-demo">
    <cron-editor v-bind="props" v-model="value"></cron-editor>
    <p>cron expression: {{ value }}</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const props = Object.fromEntries(params.entries())

    const value = ref(params.get('initial-value') ?? '* * * * *')

    return {
      props: props,
      value: ref(value),
    }
  },
})
</script>

<style>
.cron-demo p {
  margin-top: 1rem;
}
</style>

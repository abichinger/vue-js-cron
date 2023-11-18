<template>
  <div id="app">
    <CronNaive v-model="value" />
  </div>
</template>

<script lang="ts">
import CronNaive from '@/components/cron-naive-ui.vue'

export default {
  components: {
    CronNaive,
  },

  data: () => {
    const value = '1-3,5,10-12 */4 * * *'

    return {
      value,
      nextValue: value,
    }
  },
}
</script>

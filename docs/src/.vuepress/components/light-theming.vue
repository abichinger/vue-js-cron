<template>
  <div>
    <div class="mb-2">{{ value }}</div>

    <p class="pb-1">theme: ant (default)</p>
    <CronLight v-model="value" />

    <p class="pb-1 pt-4">theme: legacy</p>
    <CronLight v-model="value" theme="legacy" />

    <p class="pb-1 pt-4">dark mode</p>
    <div class="dark" style="padding: 1rem; background-color: #0d1117">
      <CronLight v-model="value" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '0 9 * * 1-5',
    }
  },
}
</script>

<template>
  <div>
    <p class="pb-1">theme: ant (default)</p>
    <CronLight v-model="value" />

    <p class="pb-1 pt-4">theme: legacy</p>
    <CronLight v-model="value" theme="legacy" />
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

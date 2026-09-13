<template>
  <div>
    <div class="mb-2">{{ value }}</div>
    <CronLight v-model="value" :format="format" @error="error = $event" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '0 0 0 * * *',
      error: '',
      format: { inherit: 'spring', specialDays: false },
    }
  },
}
</script>

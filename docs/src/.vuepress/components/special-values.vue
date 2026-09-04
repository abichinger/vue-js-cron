<template>
  <div>
    <div class="mb-2">{{ value }}</div>
    <CronLight v-model="value" format="quartz" @error="error = $event" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '0 0 0 L * ?',
      error: '',
    }
  },
}
</script>

<template>
  <div>
    <div class="mb-2">{{value}}</div>
    <CronLight v-model="value" :periods="periods" @error="error=$event"></CronLight>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '* * * * *',
      error: '',
      periods: [
        { id: 'month', value: ['day', /* 'dayOfWeek', */ 'hour', 'minute'] },
        { id: 'day', value: ['hour', 'minute'] }
      ]
    }
  }
}
</script>

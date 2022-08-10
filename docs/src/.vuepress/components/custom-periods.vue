<template>
  <v-app>

    <div class="mb-2">{{value}}</div>
    <CronLight v-model="value" :periods="periods" @error="error=$event"></CronLight>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      value: '* * * * *',
      error: '',
      periods: [
        { id: 'month', text: 'Month', value: ['day', /* 'dayOfWeek', */ 'hour', 'minute'] },
        { id: 'day', text: 'Day', value: ['hour', 'minute'] }
      ]
    }
  }
}
</script>

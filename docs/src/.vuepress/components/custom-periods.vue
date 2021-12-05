<template>
  <v-app>

    <CronVuetify v-model="value" :periods="periods" @error="error=$event"></CronVuetify>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: '* * * * *',
      error: '',
      periods: [
          { id: 'month', text: 'Month', value: ['day', /*'dayOfWeek',*/ 'hour', 'minute'] },
          { id: 'day', text: 'Day', value: ['hour', 'minute'] },
      ]
    }
  },
}
</script>

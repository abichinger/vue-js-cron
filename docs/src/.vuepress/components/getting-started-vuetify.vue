<template>
  <v-app>

    <!-- editable cron expression -->
    <v-row>
      <v-col>
        <v-text-field :value="value" @change="value = $event" label="cron expression" :error-messages="error" />
      </v-col>
    </v-row>

    <CronVuetify v-model="value" @error="error=$event"></CronVuetify>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: '* * * * *',
      error: ''
    }
  },
  methods:{
    
  }
}
</script>

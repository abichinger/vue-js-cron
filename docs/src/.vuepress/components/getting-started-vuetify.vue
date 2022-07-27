<template>
  <v-app>

    <CronVuetify v-model="value" @error="error=$event"></CronVuetify>

    <!-- editable cron expression -->
    <v-row class="mt-0">
      <v-col class="pt-0">
        <v-text-field :value="value" @change="value = $event" label="cron expression" :error-messages="error" />
      </v-col>
    </v-row>

  </v-app>
</template>

<script>
export default {

  props: {
    init: {
      type: String,
      default: '* * * * *'
    }
  },

  data() {
    return {
      value: this.init,
      error: ''
    }
  },
  methods:{
    
  }
}
</script>

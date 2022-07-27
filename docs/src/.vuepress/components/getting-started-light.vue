<template>
  <div class="getting-started-light">
    <CronLight v-model="value" @error="error=$event"></CronLight>
    <div class="mt-2 grey--text text--darken-1">cron expression: {{value}}</div>
  </div>
</template>

<script>
export default {

  props: {
    init: {
      type: String,
      default: '30 12,19 24 12 *'
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

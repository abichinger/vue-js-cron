<template>
  <div class="pt-2">

    <CronLight v-model="value" @error="error=$event"></CronLight>
    <div class="text-lightest pt-2">cron expression: {{value}}</div>

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

  data () {
    return {
      value: this.init,
      error: ''
    }
  },
  methods: {

  }
}
</script>

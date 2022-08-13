<template>
  <div class="pt-2">

    <cron-light v-model="value" @error="error=$event"></cron-light>
    <div class="text-lightest pt-2">cron expression: {{value}}</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '* * * * *',
      error: ''
    }
  }
}
</script>

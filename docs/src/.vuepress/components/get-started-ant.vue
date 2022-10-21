<template>
  <div>
    <cron-ant
      v-model="value"
      :button-props="{ type: 'primary', shape: 'round', style: {backgroundColor: '#0277BD'} }"
      @error="error=$event" />

    <p class="text-lightest pt-2">cron expression: {{value}}</p>

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

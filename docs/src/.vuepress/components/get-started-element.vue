<template>
  <div>
    <cron-element-plus
      v-model="value"
      :button-props="{ type: 'primary' }"
      @error="error=$event" />

    <p class="text-lightest pt-2">cron expression: {{value}}</p>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: this.init,
      error: ''
    }
  }
}
</script>

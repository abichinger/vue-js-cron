<template>
  <div>
    <cron-naive v-model="value" @error="error=$event"></cron-naive>
    <div>cron expression: {{value}}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      value: ref('* * * * *'),
      error: ref('')
    }
  }
}
</script>

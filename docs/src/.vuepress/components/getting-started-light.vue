<template>
  <div class="getting-started-light">
    <div class="mb-2">{{value}}</div>
    <CronLight v-model="value" @error="error=$event"></CronLight>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '30 12,19 24 12 *',
      error: ''
    }
  },
  methods:{
    
  }
}
</script>

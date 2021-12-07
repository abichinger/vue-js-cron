<template>
  <div class="getting-started-light">
    <div>{{value}}</div>
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

<style scoped>

.getting-started-light > div {
  margin-top: 10px;
  margin-bottom: 6px;
}

</style>

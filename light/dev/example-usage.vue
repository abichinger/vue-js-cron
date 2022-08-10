<template>
  <div>
    <VueCronEditor v-model="value">
    </VueCronEditor>
    <div><br />cron expression: {{value}}</div>
  </div>
</template>

<script>
import VueCronEditor from '../src/CronEditor'

export default {
  name: 'Editor',
  components:{
    VueCronEditor
  },

  data:() => {
    return {
      value: '* * * * *'
    }
  }
}
</script>

<style>
.vcron-editor{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
</style>

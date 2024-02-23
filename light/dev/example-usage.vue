<template>
  <div>
    <input v-model="value" placeholder="edit me" />
    <br><br>
    <input type="checkbox" id="checkbox" v-model="enableEveryAt" />
    <label for="checkbox">Enable the every, starting at syntax</label>
    <br><br>
    <VueCronEditor v-model="value" @error="error=$event" :enableEveryAt="enableEveryAt">
    </VueCronEditor>
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
      value: '* * * * *',
      error: '',
      enableEveryAt: false
    }
  }
}
</script>

<style>
.vcron-editor{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
</style>

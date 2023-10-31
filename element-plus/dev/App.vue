<template>
  <div id="app">
    <!-- <v-text-field label="" :model-value="value" @update:model-value="nextValue = $event" @blur="value=nextValue"></v-text-field> -->
    <VueCronEditor v-model="value" />

    <br />
    {{ value }}
  </div>
</template>

<script>
import VueCronEditor from '../src/CronEditor'

export default {
  components: {
    VueCronEditor,
  },

  data: () => {
    const value = '1-3,5,10-12 */4 * * *'

    return {
      value,
      nextValue: value,
    }
  },
}
</script>

<style>
#app {
  font-family: var(--el-font-family);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 5px;
}
</style>

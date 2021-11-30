<template>
  <selection-grid v-model="value" :items="items">
  </selection-grid>
</template>

<script>
import core from '@vue-js-cron/core'
const {util} = core

export default {
  data() {
    let a = new Array(60).fill(0)
    return {
      value: undefined,
      items: a.map((_, i) => {return {value: i, text: util.pad(i, 2)}}) 
    }
  },
}
</script>

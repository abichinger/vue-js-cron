<template>
<div>
  <v-select v-bind="$attrs" v-on="$listeners">

    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope" /></template>

  </v-select>
</div>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'CustomSelect',
  props:{

  }
}
</script>

<style>

</style>
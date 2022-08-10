<template>
  <div class="is-flex is-flex-wrap-wrap">
    <div v-for="item in items" class="flex-shrink has-text-centered p-2" :class="{...columnClasses, 'selected-value': isSelected(item)}" :key="item[valueKey]" @click="select(item)">{{item[textKey]}}</div>
    <div class="column flex-grow"></div>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      default: function () {
        return (this.multiple) ? [] : undefined
      }
    },
    items: {
      type: Array,
      default: () => []
    },
    textKey: {
      type: String,
      default: 'text'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    columnClasses: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    select (item) {
      console.log('select', item)
      if (this.multiple) {
        const value = this.value.slice()
        value.append(item.value)
        this.$emit('input', value)
      } else {
        this.$emit('input', item.value)
      }
    },
    isSelected (item) {
      if (this.multiple) {
        return this.value.includes(item.value)
      } else {
        return this.value === item.value
      }
    }
  }
}
</script>

<style scoped>

.selected-value {
  background-color: blue;
}

</style>

<template>
  <div>

    <cron-vuetify
      v-model="value"
      :chip-props="{ color: 'success', textColor: 'white' }"
      @error="error=$event" />

    <!-- editable cron expression -->
    <v-text-field
      class="pt-3"
      :modelValue="value"
      @update:model-value="nextValue = $event"
      @blur="value = nextValue"
      label="cron expression"
      :error-messages="error" />

  </div>
</template>

<script>
export default {

  props: {
    init: {
      type: String,
      default: '* * * * *'
    }
  },

  data () {
    return {
      value: this.init,
      nextValue: this.init,
      error: ''
    }
  }
}
</script>

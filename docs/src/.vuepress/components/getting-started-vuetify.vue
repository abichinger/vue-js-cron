<template>
  <div>

    <CronVuetify v-model="value" @error="error=$event"></CronVuetify>

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
  },
  methods: {

  }
}
</script>

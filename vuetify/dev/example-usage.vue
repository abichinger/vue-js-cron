<template>
  <v-app id="app">
    <v-container>
        <v-card>
            <v-card-text>
                <v-text-field label="" :model-value="value" @update:model-value="nextValue = $event" @blur="value=nextValue"></v-text-field>
                <VueCronEditor v-model="value" :fields="fields" :chipProps="{ color: 'primary' }" />
            </v-card-text>
        </v-card>

        <v-card class="mt-10 pa-15" elevation="0" :border="30" color="#ddd" style="margin: auto">
            <v-card-text class="text-center text-black">
                <div class="mb-5 text-h2 text-center font-weight-regular">vue-js-cron</div>
                <VueCronEditor v-model="value" :chipProps="{ color: '#004ba0' }" />
                <div class="mt-4 text-h4 text-grey-darken-3 font-weight-light">
                  {{value}}
                </div>
            </v-card-text>
        </v-card>
    </v-container>
  </v-app>
</template>

<script>
import cronCore from '@vue-js-cron/core'
import VueCronEditor from '../src/CronEditor'

export default {
  components: {
    VueCronEditor
  },

  data: () => {
    const value = '0 */5 7,14,21 * *'

    const minuteItems = (() => {
      const res = []
      for (const i of cronCore.util.range(0, 59, 15)) {
        const item = {
          text: cronCore.util.pad(i, 2),
          alt: i + '',
          value: i
        }
        res.push(item)
      }
      return res
    })()

    return {
      value,
      nextValue: value,
      fields: [
        { id: 'minute', items: minuteItems },
        { id: 'hour', items: cronCore.locale.defaultItems('en').hourItems },
        { id: 'day', items: cronCore.locale.defaultItems('en').dayItems },
        { id: 'month', items: cronCore.locale.defaultItems('en').monthItems },
        { id: 'dayOfWeek', items: cronCore.locale.defaultItems('en').dayOfWeekItems }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

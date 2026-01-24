<template>
  <v-app id="app">
    <v-container>
      <v-card>
        <v-card-text>
          <v-text-field
            label=""
            :model-value="value"
            @update:model-value="nextValue = $event"
            @blur="value = nextValue"
          ></v-text-field>
          <CronVuetify
            v-model="value"
            :fields="fields"
            :chipProps="{ color: 'primary', 'close-icon': 'mdi-close' }"
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-10 pa-15" elevation="0" :border="30" color="#f5f5f5" style="margin: auto">
        <v-card-text class="text-center text-black">
          <CronVuetify v-model="value" :chipProps="{ color: '#004ba0' }" />
          <div class="mt-6 text-h4 text-grey-darken-3 font-weight-light">
            {{ value }}
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import CronVuetify from '@/components/cron-vuetify.vue'
import { defaultItems, pad } from '@vue-js-cron/core'

export default {
  components: {
    CronVuetify,
  },

  data: () => {
    const value = '0 */5 7,14,21 * *'

    const minuteItems = (() => {
      const res = []
      for (const i of [0, 15, 30, 45]) {
        const item = {
          text: pad(i, 2),
          alt: i + '',
          value: i,
        }
        res.push(item)
      }
      return res
    })()

    const fieldItems = defaultItems('en')

    return {
      value,
      nextValue: value,
      fields: [
        { id: 'minute', items: minuteItems },
        { id: 'hour', items: fieldItems.hourItems },
        { id: 'day', items: fieldItems.dayItems },
        { id: 'month', items: fieldItems.monthItems },
        { id: 'dayOfWeek', items: fieldItems.dayOfWeekItems },
      ],
    }
  },
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

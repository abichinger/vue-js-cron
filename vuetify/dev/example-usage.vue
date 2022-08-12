<template>
  <v-app id="app">
    <v-container>
        <v-card>
            <v-card-text>
                <v-text-field label="" :model-value="value" @update:model-value="nextValue = $event" @blur="value=nextValue"></v-text-field>
                <VueCronEditor v-model="value" :chipProps="{ color: 'primary' }" />
            </v-card-text>
        </v-card>
    </v-container>
  </v-app>
</template>

<script>
import VueCronEditor from '../src/CronEditor'

export default {
  components: {
    VueCronEditor
  },

  data: () => {
    const value = '1-3,5,10-12 */4 * * *'

    return {
      value,
      nextValue: value
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

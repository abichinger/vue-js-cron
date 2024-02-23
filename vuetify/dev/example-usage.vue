<template>
  <v-app id="app">
    <v-container>
        <v-card>
            <v-card-text>
                <v-text-field label="" :value="value" @change="value=$event"></v-text-field>
                <v-checkbox v-model="enableEveryAt" label="Enable the every, starting at syntax"></v-checkbox>
                <VueCronEditor v-model="value" :chip-props="{ color: 'primary' }" :enableEveryAt="enableEveryAt" @error="error=$event">
                </VueCronEditor>
                <br>
                <span class="red--text">{{error}}</span>
            </v-card-text>
        </v-card>
    </v-container>
  </v-app>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

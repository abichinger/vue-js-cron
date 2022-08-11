<template>
  <v-app id="app">
    <v-container>
        <v-card>
            <v-card-text>
                <v-text-field label="" :value="value" @change="value=$event"></v-text-field>
                <VueCronEditor v-model="value" :chip-props="{ color: 'primary' }">

                </VueCronEditor>
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
      value: '* * * * *'
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

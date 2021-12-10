<template>
  <v-app>
    

    <CronCore v-model="value">
      <template #default="{fields, period, error}">
        <div> 
        
          <!-- editable cron expression -->
          <v-row>
            <v-col>
              <v-text-field :value="value" @change="value = $event" label="cron expression" :error-messages="error" />
            </v-col>
          </v-row>
          
          <v-row align="baseline" dense>
            
            <!-- period selection -->
            <v-col v-if="period.prefix" class="flex-grow-0">{{period.prefix}}</v-col>
            <v-col cols="auto">
              <v-select class="fit" v-bind="period.attrs" :items="period.items" @input="period.events.input" item-value="id" dense :menu-props="{'offset-y': true}"></v-select>
            </v-col>
            <v-col v-if="period.suffix" class="flex-grow-0">{{period.suffix}}</v-col>

            <!-- cron expression fields -->
            <template v-for="f in fields">
              <v-col v-if="f.prefix" class="flex-grow-0" :key="f.id+'-prefix'">{{f.prefix}}</v-col>
              
              <!-- custom select -->
              <v-menu offset-y :key="f.id" :close-on-content-click="false" max-height="300">
                
                <!-- menu activator -->
                <template v-slot:activator="{ on, attrs }">
                  <v-col  v-on="on" v-bind="attrs">
                    <v-text-field :value="f.selectedStr" dense readonly></v-text-field>
                  </v-col>
                </template>

                <!-- list of field items -->
                <v-list dense>
                  <v-list-item-group v-bind="f.attrs" @change="f.events.input" multiple>
                    <v-list-item v-for="item in f.items" :value="item.value" :key="item.value">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

              </v-menu>

              <v-col v-if="f.suffix" class="flex-grow-0" :key="f.id+'-suffix'">{{f.suffix}}</v-col>
            </template>
          
          </v-row>
        </div>
      </template>
    </CronCore>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: '* * * * *'
    }
  },
  methods:{
    
  }
}
</script>

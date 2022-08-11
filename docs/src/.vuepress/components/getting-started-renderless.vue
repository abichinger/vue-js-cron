<template>
  <div>
    <CronCore v-model="value" v-slot="{fields, period, error}">
      <div>

        <!-- period selection -->
        {{period.prefix}}
        <v-chip>
          {{period.attrs.modelValue}}
          <v-menu activator="parent">
            <v-list>
              <v-list-item v-for="item in period.items" :key="item.id" @click="period.events['update:model-value'](item.id)">
                {{item.text}}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-chip>
        {{period.suffix}}

        <!-- cron expression fields -->
        <template v-for="f in fields" :key="f.id">
          {{f.prefix}}

            <v-chip>
              {{f.selectedStr}}
              <v-menu activator="parent" :close-on-content-click="false">

                <!-- list of field items -->
                <v-list :selected="f.attrs.modelValue" @update:selected="f.events['update:model-value']" select-strategy="multiple">
                  <v-list-item v-for="item in f.items" :value="item.value" :key="item.value">
                    {{item.text}}
                  </v-list-item>
                </v-list>

              </v-menu>
            </v-chip>
          {{f.suffix}}
        </template>

        <!-- editable cron expression -->
        <v-text-field
          class="mt-4"
          :modelValue="value"
          @update:model-value="nextValue = $event"
          @blur="value = nextValue"
          label="cron expression"
          :error-messages="error" />

      </div>
    </CronCore>
  </div>
</template>

<script>
export default {
  data () {
    const value = '* * * * *'

    return {
      value,
      nextValue: value
    }
  },
  methods: {

  }
}
</script>

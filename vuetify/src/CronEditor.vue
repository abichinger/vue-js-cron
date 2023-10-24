
<template>
    <CronCore v-bind="$attrs" @update:model-value="$emit('update:model-value', $event)" @error="$emit('error', $event)" v-slot="{fields, period}">
      <div style="display: inline-block" >
        <v-row align="baseline" dense>
            <v-col v-if="period.prefix" class="flex-grow-0">{{period.prefix}}</v-col>
            <v-col cols="auto">
                <custom-select
                  v-bind="period.attrs"
                  :items="period.items"
                  v-on="period.events"
                  item-value="id"
                  :chip-props="chipProps" />
            </v-col>
            <v-col v-if="period.suffix" class="flex-grow-0">{{period.suffix}}</v-col>

            <template v-for="f in fields" :key="f.id">
                <v-col v-if="f.prefix" class="flex-grow-0">{{f.prefix}}</v-col>
                <v-col cols="auto">
                    <custom-select
                      v-bind="f.attrs"
                      v-on="f.events"
                      :selection="f.selectedStr"
                      :cols="cols[f.id]"
                      :items="f.items"
                      multiple
                      :chip-props="chipProps"
                      :menu-props="{ closeOnContentClick: false }"
                      clearable />
                </v-col>
                <v-col v-if="f.suffix" class="flex-grow-0">{{f.suffix}}</v-col>
            </template>
        </v-row>
      </div>
    </CronCore>
</template>

<script>
import { CronCore } from '@vue-js-cron/core'
import CustomSelect from './components/CustomSelect.vue'

export default {
  name: 'VueCronEditor',
  components: {
    CronCore,
    CustomSelect
  },
  props: {
    chipProps: {
      type: Object,
      default () {
        return {}
      }
    },
    cols: {
      type: Object,
      default: () => {
        return {
          second: 5,
          minute: 5,
          hour: 4,
          day: 4
        }
      }
    }
  },
  emits: ['update:model-value', 'error']
}
</script>

<style lang="css">

</style>

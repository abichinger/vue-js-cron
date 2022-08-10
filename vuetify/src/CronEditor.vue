
<template>
    <CronCore v-bind="$attrs" @update:model-value="$emit('update:model-value', $event)" @error="$emit('error', $event)" v-slot="{fields, period}">

        <v-row align="baseline" dense>
            <v-col v-if="period.prefix" class="flex-grow-0">{{period.prefix}}</v-col>
            <v-col cols="auto">
                <custom-select v-bind="period.attrs" :items="period.items" v-on="period.events" item-value="id" :density="density" :variant="variant"></custom-select>
            </v-col>
            <v-col v-if="period.suffix" class="flex-grow-0">{{period.suffix}}</v-col>

            <template v-for="f in fields" :key="f.id">
                <v-col v-if="f.prefix" class="flex-grow-0">{{f.prefix}}</v-col>
                <v-col cols="auto">
                    <custom-select v-bind="f.attrs" v-on="f.events" :selection="f.selectedStr" :cols="cols(f.id)" :items="f.items" multiple :density="density" :variant="variant" :close-on-content-click="false" clearable>
                    </custom-select>
                </v-col>
                <v-col v-if="f.suffix" class="flex-grow-0">{{f.suffix}}</v-col>
            </template>
        </v-row>

    </CronCore>
</template>

<script>
import CronCore from '@vue-js-cron/core'
import CustomSelect from './components/CustomSelect.vue'

export default {
  name: 'VueCronEditor',
  components: {
    CronCore: CronCore.component,
    CustomSelect
  },
  props: {
    variant: {
      type: String,
      default: 'elevated'
    },
    density: {
      type: String,
      default: 'default'
    },
    cols: {
      type: Function,
      default: (fieldId) => {
        if (fieldId === 'minute') return 5
        else if (fieldId === 'hour') return 4
        else if (fieldId === 'day') return 4
        else return 1
      }
    }
  },
  emits: ['update:model-value', 'error']
}
</script>

<style lang="css">

</style>

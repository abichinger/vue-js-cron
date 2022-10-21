
<template>
    <CronCore v-bind="$attrs" @update:model-value="$emit('update:model-value', $event)" @error="$emit('error', $event)" v-slot="{fields, period}">
        <span class="vcron-editor">
            <span>{{period.prefix}}</span>
            <div class="vcron-l-spacer">
            <custom-select v-bind="period.attrs" v-on="period.events" :items="period.items" item-value="id" :cols="cols['period'] || 1" />
            </div>
            <span>{{period.suffix}}</span>

            <template v-for="f in fields" :key="f.id">
                <span>{{f.prefix}}</span>
                <div class="vcron-l-spacer">
                <custom-select v-bind="f.attrs" v-on="f.events" :items="f.items" :cols="cols[f.id] || 1" :selection="f.selectedStr" multiple></custom-select>
                </div>
                <span>{{f.suffix}}</span>
            </template>
        </span>
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
    cols: {
      type: Object,
      default: () => {
        return {
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

<style>

.vcron-l-spacer {
  display: inline-block;
  padding: 3px;
}

</style>

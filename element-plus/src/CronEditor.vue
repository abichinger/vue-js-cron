
<template>
    <CronCore v-bind="$attrs"
      @update:model-value="$emit('update:model-value', $event)"
      @error="$emit('error', $event)"
      v-slot="{fields, period}">

      <div>
        {{period.prefix}}

        <custom-select
          v-bind="period.attrs"
          :items="period.items"
          v-on="period.events"
          item-value="id"
          :button-props="buttonProps" />

        {{period.suffix}}

        <template v-for="f in fields" :key="f.id">
          {{f.prefix}}

          <div class="vcron-el-spacer">
            <custom-select
              v-bind="f.attrs"
              v-on="f.events"
              :selection="f.selectedStr"
              :cols="cols[f.id]"
              :items="f.items"
              multiple
              :button-props="buttonProps"
              :dropdown-props="{ hideOnClick: false }"
              clearable />
          </div>

          {{f.suffix}}
        </template>
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
    buttonProps: {
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

.vcron-el-spacer {
  display: inline-block;
  padding: 3px;
}

</style>

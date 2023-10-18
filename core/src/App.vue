<template>
  <div id="app">
    Cron:
    <input :value="value" @change="value = ($event.target as HTMLInputElement).value" type="text" />
    <CronCore v-model="value" #default="{ period, error, fields }">
      <div>
        <span>
          {{ period.prefix }}:
          <select
            @input="
              period.events['update:model-value'](
                JSON.parse(($event.target as HTMLInputElement).value).id
              )
            "
          >
            <option v-for="item in period.items" :key="item.text" :value="JSON.stringify(item)">
              {{ item.text }}
            </option>
          </select>
        </span>

        <template v-for="f in fields" :key="f.id">
          <span>
            {{ f.prefix }}
            <select @input="f.events['update:model-value'](getSelected($event.target))" multiple>
              <option v-for="item in f.items" :key="item.value" :value="item.value">
                {{ item.text }}
              </option>
            </select>
            {{ f.suffix }}
          </span>
        </template>

        <div>-</div>

        <div>error:{{ error }}</div>
        <div>period:{{ period.attrs.value }}</div>
        <div v-for="f in fields" :key="'div' + f.id">
          {{ f.id }}: {{ f.attrs.value }}, {{ f.cron }}, {{ f.selectedStr }}
        </div>
      </div>
    </CronCore>
  </div>
</template>

<style scoped>
select[multiple] {
  height: 200px;
}
</style>

<script lang="ts">
import { CronCore } from './components/cron-core'

export default {
  components: {
    CronCore: CronCore
  },
  props: {},
  data() {
    return {
      value: '* * * * *'
    }
  },

  computed: {},

  watch: {},

  methods: {
    getSelected(select: any) {
      const options = select && select.options
      return Array.from(options)
        .filter((opt: any) => opt.selected)
        .map((opt: any) => opt.value)
    }
  }
}
</script>

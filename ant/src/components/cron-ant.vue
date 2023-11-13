<template>
  <CronCore
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    @error="$emit('error', $event)"
    v-slot="{ fields, period }"
  >
    <div>
      {{ period.prefix }}

      <div class="vcron-a-spacer">
        <custom-select
          v-bind="period.attrs"
          :items="period.items"
          v-on="period.events"
          item-value="id"
          :button-props="buttonProps"
        />
      </div>

      {{ period.suffix }}

      <template v-for="f in fields" :key="f.id">
        {{ f.prefix }}

        <div class="vcron-a-spacer">
          <custom-select
            v-bind="f.attrs"
            v-on="f.events"
            :selection="f.selectedStr"
            :cols="cols[f.id]"
            :items="f.items"
            multiple
            :button-props="buttonProps"
            :hideOnClick="false"
            clearable
          />
        </div>

        {{ f.suffix }}
      </template>
    </div>
  </CronCore>
</template>

<script lang="ts">
// External script works better with Typedoc
export { CronAnt as default } from './cron-ant-script'
</script>

<style lang="css">
.vcron-a-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

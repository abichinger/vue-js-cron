<template>
  <span class="vcron-editor">
    <span>{{ period.prefix.value }}</span>
    <div class="vcron-l-spacer">
      <custom-select
        :model-value="period.selected.value.id"
        item-value="id"
        :items="period.items"
        @update:model-value="period.select($event)"
        :cols="cols['period'] || 1"
      />
    </div>
    <span>{{ period.suffix.value }}</span>

    <template v-for="f in selected" :key="f.id">
      <span>{{ f.prefix.value }}</span>
      <div class="vcron-l-spacer">
        <custom-select
          :model-value="f.selected.value"
          @update:model-value="f.select($event)"
          :items="f.items"
          :cols="cols[f.id] || 1"
          :selection="f.text.value"
          multiple
          clearable
        ></custom-select>
      </div>
      <span>{{ f.suffix.value }}</span>
    </template>
  </span>
</template>

<script lang="ts">
// External script works better with Typedoc
export { CronLight as default } from './cron-light-script'
</script>

<style>
.vcron-l-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

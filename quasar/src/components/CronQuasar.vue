<template>
  <span>
    <CronCore
      v-bind="$attrs"
      @update:model-value="$emit('update:model-value', $event)"
      @error="$emit('error', $event)"
      v-slot="{ fields, period }"
    >
      <span>
        {{ period.prefix }}

        <CustomSelect
          v-bind="period.attrs"
          :items="period.items"
          v-on="period.events"
          item-value="id"
          :button-props="buttonProps"
          :menu-props="{ autoClose: true }"
        />

        {{ period.suffix }}

        <template v-for="f in fields" :key="f.id">
          {{ f.prefix }}

          <CustomSelect
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

          {{ f.suffix }}
        </template>
      </span>
    </CronCore>
  </span>
</template>

<script setup>
import core from "@vue-js-cron/core";
import CustomSelect from "./CustomSelect.vue";
const CronCore = core.component;

defineProps({
  buttonProps: {
    type: Object,
    default() {
      return {
        outline: true,
        rounded: true,
        color: "primary",
      };
    },
  },
  cols: {
    type: Object,
    default: () => {
      return {
        minute: 5,
        hour: 4,
        day: 4,
      };
    },
  },
});
</script>

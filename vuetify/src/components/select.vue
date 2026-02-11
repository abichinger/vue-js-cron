<template>
  <v-chip v-bind="chipProps" :disabled="disabled">
    <!-- Note: using v-chip.closable removes the chip -->
    <template #append v-if="clearable && !isEmpty">
      <v-icon
        class="ms-1 me-n1"
        size="small"
        :icon="chipProps.closeIcon ?? chipProps['close-icon'] ?? 'mdi-close'"
        @click.stop="clear()"
      >
      </v-icon>
    </template>

    {{ selection ?? selectedStr }}

    <v-menu activator="parent" v-bind="menuProps">
      <v-list class="pa-0 ma-0">
        <v-row v-for="(itemRow, index) in itemRows" :key="index" no-gutters>
          <v-col v-for="(item, index) in itemRow" :key="index">
            <v-list-item v-if="item" class="vcron-v-item" @click="select(item)" :active="has(item)">
              {{ item.text }}
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
  </v-chip>
</template>

<script lang="ts">
import { selectProps, setupSelect } from '@vue-js-cron/core'

export default {
  inheritAttrs: false,
  name: 'CustomSelect',
  props: {
    ...selectProps<any, any>(),
    menuProps: {
      type: Object,
      default: () => {},
    },
    chipProps: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:model-value'],
  setup(props, ctx) {
    return setupSelect(props, () => props.modelValue, ctx)
  },
  methods: {
    chipIcon() {
      return null
    },
  },
}
</script>

<style>
.vcron-v-item div {
  overflow: visible;
}
</style>

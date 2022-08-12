<template>
  <renderless-select
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    #default="{ modelValue, selectedStr, itemRows, select, isSelected, clearable, clear }">

    <v-chip v-if="true" v-bind="chipProps">

      <template #append v-if="clearable">
        <v-icon v-if="modelValue.length > 0" size="small" icon="mdi-close" @click.stop="clear()">
        </v-icon>
      </template>

      {{selectedStr}}

      <v-menu activator="parent" v-bind="menuProps">
        <v-list class="pa-0 ma-0">
            <v-row v-for="(itemRow, index) in itemRows" :key="index" no-gutters>
              <v-col v-for="(item, index) in itemRow" :key="index">
                <v-list-item v-if="item" @click="select(item)" :active="isSelected(item)">{{item.text}}</v-list-item>
              </v-col>
            </v-row>
        </v-list>
      </v-menu>
    </v-chip>
  </renderless-select>
</template>

<script>
import { RenderlessSelect } from '@vue-js-cron/core'

export default {
  inheritAttrs: false,
  components: {
    RenderlessSelect
  },
  name: 'CustomSelect',
  props: {
    menuProps: {
      type: Object,
      default: () => {}
    },
    chipProps: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:model-value']
}
</script>

<style>
</style>

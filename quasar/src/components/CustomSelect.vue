<template>
  <renderless-select
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    #default="{ selectedStr, itemRows, select, isSelected, clearable, clear }"
  >
    <span>
      <q-btn class="q-ma-xs" v-bind="buttonProps">
        {{ selectedStr }}
        <q-icon
          class="q-pl-xs"
          v-if="clearable"
          name="close"
          :size="buttonProps.size ?? 'sm'"
          @click="clear()"
          @click.stop=""
        />
        <q-menu :offset="[0, 7]" v-bind="menuProps">
          <div class="row" style="line-height: 32px" v-for="(itemRow, r) in itemRows" :key="r">
            <q-item
              clickable
              dense
              :active="isSelected(item)"
              class="col"
              v-for="(item, c) in itemRow"
              :key="c"
              @click="select(item)"
            >
              <template v-if="item">{{ item.text }}</template>
            </q-item>
          </div>
        </q-menu>
      </q-btn>
    </span>
  </renderless-select>
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { RenderlessSelect } from '@vue-js-cron/core'
import { QMenu, QBtn, QItem, QIcon } from 'quasar'

defineProps({
  buttonProps: {
    type: Object,
    default: () => {},
  },
  menuProps: {
    type: Object,
    default: () => {},
  },
})

defineEmits(['update:model-value'])
</script>

<style scoped></style>

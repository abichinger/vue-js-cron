<template>
  <span>
    <q-btn class="q-ma-xs" v-bind="buttonProps">
      {{ selection ?? selectedStr }}
      <q-icon
        class="q-pl-xs"
        v-if="clearable && !isEmpty"
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
            :active="has(item)"
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
</template>

<script lang="ts">
import { selectProps, setupSelect } from '@vue-js-cron/core'
import { QBtn, QIcon, QItem, QMenu } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    QMenu,
    QBtn,
    QItem,
    QIcon,
  },
  name: 'CustomSelect',
  props: {
    ...selectProps<any, string | number>(),
    buttonProps: {
      type: Object,
      default: () => {},
    },
    menuProps: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:model-value'],
  setup(props, ctx) {
    return setupSelect(props, () => props.modelValue, ctx)
  },
})
</script>

<style scoped></style>

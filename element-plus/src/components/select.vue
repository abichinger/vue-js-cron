<template>
  <span class="custom-select">
    <el-dropdown style="vertical-align: baseline" trigger="click" v-bind="dropdownProps">
      <el-button v-bind="buttonProps" :disabled="disabled">
        {{ selection ?? selectedStr }}
        <el-icon v-if="clearable && !isEmpty" class="el-icon--right" @click="clear()" @click.stop=""
          ><Close
        /></el-icon>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <div class="vcron-el-row" v-for="(itemRow, i) in itemRows" :key="i">
            <div
              v-for="(item, j) in itemRow"
              :key="i + '-' + j"
              class="vcron-el-col"
              @click="select(item)"
            >
              <el-dropdown-item>
                <span :class="{ 'vcron-el-selected': has(item) }" v-if="item">
                  {{ item.text }}
                </span>
              </el-dropdown-item>
            </div>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </span>
</template>

<script lang="ts">
import { Close } from '@element-plus/icons-vue'
import { selectProps, setupSelect } from '@vue-js-cron/core'
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Close,
  },
  name: 'CustomSelect',
  props: {
    buttonProps: {
      type: Object,
      default: () => {},
    },
    dropdownProps: {
      type: Object,
      default: () => {},
    },
    ...selectProps<any, string | number>(),
  },
  emits: ['update:model-value'],
  setup(props, ctx) {
    return setupSelect(props, () => props.modelValue, ctx)
  },
})
</script>

<style scoped>
.vcron-el-row {
  display: flex;
  flex-wrap: nowrap;
}

.vcron-el-col {
  font-family: var(--el-font-family);
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  min-width: 0;
  white-space: nowrap;
  box-sizing: border-box;
  user-select: none;
  text-align: center;
}

.vcron-el-selected {
  color: var(--el-color-primary);
  font-weight: 700;
}
</style>

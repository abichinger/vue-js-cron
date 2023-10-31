<template>
  <renderless-select
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    #default="{ selectedStr, itemRows, select, isSelected, clearable, clear }"
  >
    <span class="custom-select">
      <el-dropdown style="vertical-align: baseline" trigger="click" v-bind="dropdownProps">
        <el-button v-bind="buttonProps">
          {{ selectedStr
          }}<el-icon v-if="clearable" class="el-icon--right" @click="clear()" @click.stop=""
            ><Close
          /></el-icon>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <div class="vcron-el-row" v-for="(itemRow, index) in itemRows" :key="index">
              <template v-for="(item, index) in itemRow" :key="index">
                <div class="vcron-el-col selected" @click="select(item)">
                  <el-dropdown-item
                    :style="
                      isSelected(item)
                        ? { color: 'var(--el-color-primary)', 'font-weight': 700 }
                        : {}
                    "
                  >
                    <template v-if="item">{{ item.text }}</template>
                  </el-dropdown-item>
                </div>
              </template>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </renderless-select>
</template>

<script>
import { RenderlessSelect } from '@vue-js-cron/core'
import { Close } from '@element-plus/icons-vue'

export default {
  inheritAttrs: false,
  components: {
    RenderlessSelect,
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
  },
  emits: ['update:model-value'],
}
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
</style>

<template>
  <renderless-select
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    #default="{ selectedStr, itemRows, select, clearable, clear, modelValue, itemValue }">

    <span class="custom-select">
    <a-dropdown :trigger="['click']" v-model:visible="visible" v-bind="dropdownProps">

      <a-button v-bind="buttonProps">
        {{selectedStr}}<CloseCircleFilled v-if="clearable" @click="clear()" @click.stop="" />
      </a-button>

      <template #overlay>
        <a-menu multiple :selectedKeys="Array.isArray(modelValue) ? modelValue : [modelValue]">
          <a-row class="vcron-a-row" type="flex" v-for="(itemRow, i) in itemRows" :key="i">
            <a-col class="vcron-a-col"  :flex="1" v-for="(item, j) in itemRow" :key="j">
              <a-menu-item v-if="item" :key="item[itemValue]" @click="select(item); updateVisibility();">{{item.text}}</a-menu-item>
              <a-menu-item v-else></a-menu-item>
            </a-col>
          </a-row>
        </a-menu>
      </template>

    </a-dropdown>
    </span>
  </renderless-select>
</template>

<script>
import { RenderlessSelect } from '@vue-js-cron/core'
import { CloseCircleFilled } from '@ant-design/icons-vue'

export default {
  inheritAttrs: false,
  components: {
    RenderlessSelect,
    CloseCircleFilled
  },
  name: 'CustomSelect',
  props: {
    buttonProps: {
      type: Object,
      default: () => {}
    },
    dropdownProps: {
      type: Object,
      default: () => {}
    },
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      visible: false
    }
  },
  emits: ['update:model-value'],
  methods: {
    updateVisibility () {
      if (this.hideOnClick && this.visible) {
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>

.vcron-a-row {
  flex-wrap: nowrap !important;
}

.vcron-a-col {
  flex-basis: 100% !important;
  min-width: 0;
  text-align: center;
}

</style>

import CustomSelect from '@/components/select.vue'
import { CronCore, cronCoreProps } from '@vue-js-cron/core'

import type { ButtonProps } from 'ant-design-vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const cronAntProps = () => ({
  /**
   * Properties of Ant Design Vue Button
   *
   * @remarks
   * See {@link https://antdv.com/components/button#api}
   */
  buttonProps: {
    type: Object as PropType<ButtonProps>,
    default() {
      return {}
    },
  },
  ...cronCoreProps(),
})

export const CronAnt = {
  name: 'VueCronEditor',
  components: {
    CronCore,
    CustomSelect,
  },
  props: cronAntProps(),
  emits: ['update:model-value', 'error'],
}

/**
 * Props of {@link CronAnt}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronAntProps = Partial<ExtractPropTypes<ReturnType<typeof cronAntProps>>>

import CustomSelect from '@/components/select.vue'
import { cronCoreProps, useCron } from '@vue-js-cron/core'
import { defineComponent, watch, type ExtractPropTypes } from 'vue'

export const cronLightProps = () => ({
  ...cronCoreProps(),
})

export const CronLight = defineComponent({
  name: 'CronLight',
  components: {
    CustomSelect,
  },
  emits: ['update:model-value', 'error'],
  props: cronLightProps(),
  setup(props, { emit }) {
    const cron = useCron(props)

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          cron.cron.value = value
        }
      },
    )

    watch(cron.cron, (value) => {
      emit('update:model-value', value)
    })

    watch(cron.error, (error) => {
      emit('error', error)
    })

    return {
      ...cron,
    }
  },
})

/**
 * Props of {@link CronLight}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronLightProps = Partial<ExtractPropTypes<ReturnType<typeof cronLightProps>>>

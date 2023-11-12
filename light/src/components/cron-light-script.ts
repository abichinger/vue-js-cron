import CustomSelect from '@/components/select.vue'
import { CronCoreProps, useCron } from '@vue-js-cron/core'
import { defineComponent, watch } from 'vue'

/**
 * Props declaration of {@link CronLight}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 */
export const CronLightProps = {
  ...CronCoreProps,
}

export const CronLight = defineComponent({
  name: 'CronLight',
  components: {
    CustomSelect,
  },
  emits: ['update:model-value', 'error'],
  props: CronLightProps,
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

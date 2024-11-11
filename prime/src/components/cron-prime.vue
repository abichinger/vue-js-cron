<template>
  <span>CronPrime</span>
</template>

<script lang="ts">
import { cronCoreProps } from '@vue-js-cron/core'
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronPrimeProps = () => ({
  ...cronCoreProps(),
})

/**
 * Props of {@link CronPrime}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronPrimeProps = Partial<ExtractPropTypes<ReturnType<typeof cronPrimeProps>>>

export default defineComponent({
  name: 'CronPrime',
  props: cronPrimeProps(),
  // This component will be implemented in the next step
})
</script>

import { AnySegment, EverySegment, NoSpecificSegment, RangeSegment, ValueSegment } from '@/cron'
import type { Localization } from '@/locale/types'
import {
  computed,
  defineComponent,
  ref,
  watch,
  type ExtractPropTypes,
  type PropType,
  type SetupContext,
} from 'vue'
import { getLocale } from '../locale'
import { FieldWrapper, TextPosition, type CronFormat, type Field, type Period } from '../types'
import { defaultItems } from '../util'
import { useCronSegment, type UseCronSegmentReturn } from './cron-segment'

export interface CronOptions {
  initialValue?: string
  initialPeriod?: string
  locale?: string
  fields?: Field[]
  periods?: Period[]
  customLocale?: Localization
  format?: CronFormat
}

export interface CronContext {
  segmentMap: Map<string, UseCronSegmentReturn>
}

function createCron(len: number, seg: string = '*') {
  return new Array(len).fill(seg).join(' ')
}

function isDefined<T>(obj: T | undefined): obj is T {
  return obj !== undefined
}

export class DefaultCronOptions {
  locale = 'en'

  format: CronFormat = 'crontab'

  initialValue(len: number, seg: string = '*') {
    return createCron(len, seg)
  }

  fields(format: CronFormat, locale: string): Field[] {
    const isQuartz = format == 'quartz'
    const items = defaultItems(locale)

    const setNoSpecific = (fieldId: string) => {
      return (value: UseCronSegmentReturn, { segmentMap }: CronContext) => {
        if (value.cron.value == '?') {
          return
        }

        const segment = segmentMap.get(fieldId)
        if (!segment) {
          return
        }
        segment.cron.value = '?'
      }
    }

    return [
      ...(isQuartz ? [{ id: 'second', items: items.secondItems }] : []),
      { id: 'minute', items: items.minuteItems },
      { id: 'hour', items: items.hourItems },
      {
        id: 'day',
        items: items.dayItems,
        onChange: isQuartz ? setNoSpecific('dayOfWeek') : undefined,
        segmentFactories: isQuartz
          ? [
              AnySegment.fromString,
              NoSpecificSegment.fromString,
              EverySegment.fromString,
              RangeSegment.fromString,
              ValueSegment.fromString,
            ]
          : undefined,
      },
      { id: 'month', items: items.monthItems },
      {
        id: 'dayOfWeek',
        items: items.dayOfWeekItems,
        onChange: isQuartz ? setNoSpecific('day') : undefined,
        segmentFactories: isQuartz
          ? [
              AnySegment.fromString,
              NoSpecificSegment.fromString,
              EverySegment.fromString,
              RangeSegment.fromString,
              ValueSegment.fromString,
            ]
          : undefined,
      },
    ]
  }

  periods(format: CronFormat): Period[] {
    const isQuartz = format == 'quartz'
    const second = isQuartz ? [{ id: 'q-second', value: [] }] : []
    const secondField = isQuartz ? ['second'] : []
    const prefix = isQuartz ? 'q-' : ''

    return [
      ...second,
      { id: prefix + 'minute', value: [...secondField] },
      { id: prefix + 'hour', value: ['minute', ...secondField] },
      { id: 'day', value: ['hour', 'minute', ...secondField] },
      { id: 'week', value: ['dayOfWeek', 'hour', 'minute', ...secondField] },
      { id: 'month', value: ['day', 'dayOfWeek', 'hour', 'minute', ...secondField] },
      { id: 'year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute', ...secondField] },
    ]
  }
}

export function findFirstPeriod(
  periods: Period[],
  cron: string,
  fields: Field[],
): Period | undefined {
  const segments = cron.split(' ')
  if (segments.length !== fields.length) {
    return
  }
  const dirtyFields = fields.filter((_, i) => !['*', '?'].includes(segments[i])).map((f) => f.id)
  // find the first period, which includes all dirty fields
  return periods.find((p) => {
    const visible = new Set(p.value)
    return dirtyFields.every((fid) => visible.has(fid))
  })
}

export function useCron(options: CronOptions) {
  const cronDefaults = new DefaultCronOptions()

  const locale = options.locale ?? cronDefaults.locale
  const format = options.format ?? cronDefaults.format
  const { customLocale, fields = cronDefaults.fields(format, locale) } = options
  const initialValue = options.initialValue ?? cronDefaults.initialValue(fields.length)

  const l10n = getLocale(locale, customLocale)
  const periods = (options.periods ?? cronDefaults.periods(format)).map((p) => {
    return {
      ...p,
      text: p.text ?? l10n.getLocaleStr(p.id, TextPosition.Text),
    }
  })
  const initialPeriod =
    (options.initialPeriod ? periods.find((p) => p.id == options.initialPeriod) : undefined) ??
    findFirstPeriod([...periods].reverse(), initialValue, fields) ??
    periods[periods.length - 1]

  const cron = ref(initialValue)
  const error = ref('')
  const period = ref(initialPeriod)
  const periodPrefix = ref('')
  const periodSuffix = ref('')
  const segments = fields.map((f) => {
    return useCronSegment({ field: new FieldWrapper(f), locale: l10n, period })
  })

  const segmentMap = new Map(segments.map((s) => [s.id, s]))
  const selected = computed(() => {
    return period.value.value.map((fieldId) => {
      const segment = segmentMap.get(fieldId)
      if (isDefined(segment)) {
        return segment
      }
      throw Error('${fieldId} not found')
    })
  })

  const fromCron = (value: string) => {
    if (!value) {
      cron.value = createCron(fields.length)
      return
    }

    const strSegments = value.split(' ')

    if (strSegments.length !== fields.length) {
      error.value = 'invalid pattern'
      return
    }

    for (let i = 0; i < strSegments.length; i++) {
      if (segments[i].cron.value != strSegments[i]) {
        segments[i].cron.value = strSegments[i]
      }
    }
    error.value = ''
  }
  fromCron(initialValue)

  const toCron = () => {
    cron.value = segments
      .map((s) => {
        return period.value.value.includes(s.id) || s.cron.value == '?' ? s.cron.value : '*'
      })
      .join(' ')
  }

  const translate = () => {
    periodPrefix.value = l10n.getLocaleStr(period.value.id, TextPosition.Prefix)
    periodSuffix.value = l10n.getLocaleStr(period.value.id, TextPosition.Suffix)
  }
  translate()

  watch(cron, fromCron)
  watch(period, () => {
    toCron()
    translate()
  })

  segments.forEach((s, i) => {
    watch(s.cron, () => {
      fields[i].onChange?.(s, { segmentMap })
      toCron()
    })
    watch(s.error, (value) => {
      error.value = value
    })
  })

  return {
    cron,
    error,
    segments,
    selected,
    period: {
      select: (periodId: string) => {
        const i = periods.map((p) => p.id).indexOf(periodId)
        if (i == -1) {
          return
        }
        period.value = periods[i]
      },
      selected: period,
      items: periods,
      prefix: periodPrefix,
      suffix: periodSuffix,
    },
  }
}

/**
 * @interface
 */
export type UseCronReturn = ReturnType<typeof useCron>

export function setupCron(
  props: CronCoreProps,
  { emit }: SetupContext<['update:model-value', 'update:period', 'error']>,
): UseCronReturn {
  const options: CronOptions = {
    ...props,
    initialValue: props.modelValue,
    initialPeriod: props.period,
  }

  const cron = useCron(options)

  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        cron.cron.value = value
      }
    },
  )

  watch(
    () => props.period,
    (value) => {
      if (value) {
        cron.period.select(value)
      }
    },
  )

  watch(cron.cron, (value) => {
    emit('update:model-value', value)
  })

  watch(cron.period.selected, (value) => {
    emit('update:period', value.id)
  })

  watch(cron.error, (error) => {
    emit('error', error)
  })

  return cron
}

export const cronCoreProps = () => ({
  /**
   * The value of the cron expression
   *
   * @defaultValue crontab: `* * * * *`, quartz: `* * * * * *`
   */
  modelValue: {
    type: String,
  },
  /**
   * The id of a period to select
   *
   * @defaultValue last entry of `CronCoreProps.periods`
   */
  period: {
    type: String,
  },
  /**
   * The format of the cron expression, either crontab or quartz
   *
   * @defaultValue `crontab`
   */
  format: {
    type: String as PropType<CronFormat>,
  },
  /**
   * The locale of the component, such as `en`, `de`, etc.
   *
   * @defaultValue `en`
   */
  locale: {
    type: String,
  },
  /** The segments of the cron expression, such as second, minute, hour, etc. */
  fields: {
    type: Array as PropType<Field[]>,
  },
  /** The periods to select, e.g. Every month, day, etc.  */
  periods: {
    type: Array as PropType<Period[]>,
  },
  /** The custom locale object, used to override values of the current {@link Localization} */
  customLocale: {
    type: Object as PropType<Localization>,
  },
  /** Number of columns in the dropdown,
   * e.g. the possible values of minute (0-59) will be displayed in a grid with 5 columns
   *
   * @defaultValue
   * ```
   * {
   *    second: 5,
   *    minute: 5,
   *    hour: 4,
   *    day: 4,
   *  }
   * ```
   */
  cols: {
    type: Object as PropType<Record<string, number>>,
    default: () => {
      return {
        second: 5,
        minute: 5,
        hour: 4,
        day: 4,
      }
    },
  },
  /** Disable the cron editor */
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * Properties of {@link CronCore}.
 * These properties are shared across all cron components
 *
 * @interface
 */
export type CronCoreProps = Partial<ExtractPropTypes<ReturnType<typeof cronCoreProps>>>

export const CronCore = defineComponent({
  name: 'VueCronCore',
  props: cronCoreProps(),
  emits: ['update:model-value', 'update:period', 'error'],
  setup(props, ctx) {
    const { error, selected, period } = setupCron(props, ctx)

    return () => {
      const slotProps = {
        error: error,
        fields: selected.value.map((s) => {
          return {
            id: s.id,
            items: s.items,
            cron: s.cron.value,
            selectedStr: s.text.value,
            events: {
              'update:model-value': s.select,
            },
            attrs: {
              modelValue: s.selected.value,
            },
            prefix: s.prefix.value,
            suffix: s.suffix.value,
          }
        }),

        period: {
          attrs: {
            modelValue: period.selected.value.id,
          },
          events: {
            'update:model-value': period.select,
          },
          items: period.items,
          prefix: period.prefix.value,
          suffix: period.suffix.value,
        },
      }

      return ctx.slots.default?.(slotProps)
    }
  },
})

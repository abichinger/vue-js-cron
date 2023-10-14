import type { Localization } from '@/locale/types'
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { getLocale } from '../locale'
import { FieldWrapper, TextPosition, type Field, type Period } from '../types'
import { defaultItems } from '../util'
import { useCronSegment } from './cron-segment'

interface CronOptions {
  initialValue?: string
  locale?: string
  fields?: Field[]
  periods?: Period[]
  customLocale?: Localization
}

function createCron(len: number, seg: string = '*') {
  return new Array(len).fill(seg).join(' ')
}

function isDefined<T>(obj: T | undefined): obj is T {
  return obj !== undefined
}

class DefaultCronOptions {
  locale = 'en'

  initialValue(len: number, seg: string = '*') {
    return createCron(len, seg)
  }

  fields(locale: string) {
    const items = defaultItems(locale)

    return [
      { id: 'minute', items: items.minuteItems },
      { id: 'hour', items: items.hourItems },
      { id: 'day', items: items.dayItems },
      { id: 'month', items: items.monthItems },
      { id: 'dayOfWeek', items: items.dayOfWeekItems }
    ]
  }

  periods() {
    return [
      { id: 'minute', value: [] },
      { id: 'hour', value: ['minute'] },
      { id: 'day', value: ['hour', 'minute'] },
      { id: 'week', value: ['dayOfWeek', 'hour', 'minute'] },
      { id: 'month', value: ['day', 'dayOfWeek', 'hour', 'minute'] },
      { id: 'year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute'] }
    ]
  }
}

export function useCron(options: CronOptions) {
  const cronDefaults = new DefaultCronOptions()

  const locale = options.locale ?? 'en'
  const {
    customLocale,
    fields = cronDefaults.fields(locale),
    periods = cronDefaults.periods()
  } = options
  const initialValue = options.initialValue ?? cronDefaults.initialValue(fields.length)

  const l10n = getLocale(locale, customLocale)

  const cron = ref(initialValue)
  const error = ref('')
  const period = ref(periods[periods.length - 1])
  const periodText = ref('')
  const periodPrefix = ref('')
  const periodSuffix = ref('')
  const segments = fields.map((f) => {
    return useCronSegment({ field: new FieldWrapper(f), locale: l10n, period })
  })

  const segmentMap = new Map(segments.map((s) => [s.field.id, s]))
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
        return period.value.value.includes(s.field.id) ? s.cron.value : '*'
      })
      .join(' ')
  }

  const translate = () => {
    periodPrefix.value = l10n.getLocaleStr(period.value.id, TextPosition.Prefix)
    periodSuffix.value = l10n.getLocaleStr(period.value.id, TextPosition.Suffix)
  }
  translate()

  watch(cron, fromCron)
  watch(period, translate)

  segments.forEach((s) => {
    watch(s.cron, toCron)
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
      items: periods.map((p) => {
        return {
          ...p,
          text: l10n.getLocaleStr(p.id, TextPosition.Text)
        }
      }),
      text: periodText,
      prefix: periodPrefix,
      suffix: periodSuffix
    },
    fields
  }
}

export const cronProps = {
  modelValue: {
    type: String
  },
  locale: {
    type: String
  },
  fields: {
    type: Array as PropType<Field[]>
  },
  periods: {
    type: Array as PropType<Period[]>
  },
  customLocale: {
    type: Object as PropType<Localization>
  }
}

export function useCronComponent() {
  return defineComponent({
    name: 'VueCronCore',
    props: cronProps,
    emits: ['update:model-value', 'error'],
    setup(props, ctx) {
      const { cron, error, selected, period } = useCron(props)

      watch(cron, (value) => {
        ctx.emit('update:model-value', value)
      })

      watch(error, (value) => {
        ctx.emit('error', value)
      })

      watch(
        () => props.modelValue,
        (value) => {
          if (value) {
            cron.value = value
          }
        }
      )

      return () => {
        const slotProps = {
          error: error,
          fields: selected.value.map((s) => {
            return {
              id: s.field.id,
              items: s.field.items,
              cron: s.cron.value,
              selectedStr: s.text.value,
              events: {
                'update:model-value': s.select
              },
              attrs: {
                modelValue: s.selected.value
              },
              prefix: s.prefix.value,
              suffix: s.suffix.value
            }
          }),

          period: {
            attrs: {
              modelValue: period.selected.value.id
            },
            events: {
              'update:model-value': period.select
            },
            items: period.items,
            prefix: period.prefix.value,
            suffix: period.suffix.value
          }
        }

        return ctx.slots.default?.(slotProps)
      }
    }
  })
}

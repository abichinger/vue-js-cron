import { CombinedSegment, arrayToSegment, cronToSegment } from '@/cron'
import type { L10nEngine } from '@/locale'
import { TextPosition, type CronSegment, type FieldWrapper, type Period } from '@/types'
import { ref, watch, type Ref } from 'vue'

export interface FieldOptions {
  l10n: L10nEngine
  period: Ref<Period>
  field: FieldWrapper
  initialCron?: string
}

export function useCronSegment(options: FieldOptions) {
  const { period, field, initialCron = '*', l10n } = options

  const cron = ref(initialCron)
  const error = ref('')
  const selected = ref<number[]>([])

  const text = ref('')
  const prefix = ref('')
  const suffix = ref('')

  const translate = (seg: CronSegment) => {
    const segments = seg instanceof CombinedSegment ? seg.segments : [seg]

    text.value = segments
      .map((seg) => {
        return l10n.render(period.value.id, field.id, seg.type, TextPosition.Text, {
          field: field,
          ...seg.items,
        })
      })
      .join(',')

    prefix.value = l10n.getTemplate(period.value.id, field.id, seg.type, TextPosition.Prefix)
    suffix.value = l10n.getTemplate(period.value.id, field.id, seg.type, TextPosition.Suffix)
  }

  const parseCron = (cron: string) => {
    const seg = cronToSegment(cron, field)
    if (seg != null) {
      selected.value = seg.toArray()
      translate(seg)
    } else {
      error.value = `${cron} is not a valid cron segment (${field.id})`
    }
  }

  const toCron = (value: number[]) => {
    if (cron.value == '?' && value.length == 0) {
      return
    }

    const seg = arrayToSegment(value, field)
    if (seg != null) {
      cron.value = seg.toCron()
      translate(seg)
    } else {
      error.value = `failed to convert ${value} to cron (${field.id})`
    }
  }

  parseCron(initialCron)

  const select = (evt: number[]) => {
    const sorted = Array.from(evt).sort((a, b) => {
      return a > b ? 1 : -1
    })
    selected.value = sorted
  }

  watch(cron, (value) => {
    parseCron(value)
  })

  watch(selected, (value) => {
    toCron(value)
  })

  watch(period, () => {
    const seg = cronToSegment(cron.value, field)
    if (seg != null) {
      translate(seg)
    }
  })

  return {
    id: field.id,
    items: field.items,
    cron,
    selected,
    error,
    select,
    text,
    prefix,
    suffix,
  }
}

export type UseCronSegmentReturn = ReturnType<typeof useCronSegment>

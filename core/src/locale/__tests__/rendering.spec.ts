import { useCron, type UseCronReturn } from '@/components/cron-core'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

const locales = Object.keys(import.meta.glob(['../*.ts', '!../index.ts', '!../types.ts'])).map(
  (file) => (file === '../cn.ts' ? 'zh' : file.slice(3, -3)),
)

const schedules: {
  name: string
  value: string
  period: string
  expected: Record<string, string>
}[] = [
  {
    name: 'every second',
    value: '* * * * * ?',
    period: 'q-second',
    expected: {
      da: 'Hver Sekund',
      de: 'Jede Sekunde',
      en: 'Every Second',
      es: 'todos los segundos',
      fr: 'Toutes Seconde',
      he: 'בכל שניה',
      hi: 'हर सेकंड',
      it: 'Tutti Secondo',
      ja: '毎 秒',
      ko: '매 초',
      pt: 'Todo Segundo',
      ru: 'Каждый Секунда',
      tg: 'Ҳар Сония',
      uk: 'Кожний Секунда',
      zh: '每 秒',
    },
  },
  {
    name: 'at second 20 of every minute',
    value: '20 * * * * ?',
    period: 'q-minute',
    expected: {
      da: 'Hver Minut ved 20 sekund(er)',
      de: 'Jede Minute und 20 Sekunde(n)',
      en: 'Every Minute at 20 second(s)',
      es: 'todos los minutos a los 20 segundos',
      fr: 'Toutes Minute et 20 seconde(s)',
      he: 'בכל דקה ב 20 שניות',
      hi: 'हर मिनट और 20 सेकंड',
      it: 'Tutti Minuto e 20 secondo/i',
      ja: '毎 分 と 20 秒',
      ko: '매 분 와 20 초',
      pt: 'Todo Minuto aos 20 segundo(s)',
      ru: 'Каждый Минута и 20 секунд(а/ы)',
      tg: 'Ҳар Дақиқа дар 20 сония',
      uk: 'Кожний Хвилина и 20 секунд(а)',
      zh: '每 分钟 : 20 秒',
    },
  },
  {
    name: 'throughout minute 15 of every hour',
    value: '* 15 * * * ?',
    period: 'q-hour',
    expected: {
      da: 'Hver Time på 15 : hvert sekund',
      de: 'Jede Stunde und 15 und jede Sekunde',
      en: 'Every Hour at 15 : every second',
      es: 'todas las horas en el minuto 15 : todos los segundos',
      fr: 'Toutes Heure et 15 et toutes les secondes',
      he: 'בכל שעה ב 15 : כל שניה',
      hi: 'हर घंटा और 15 और हर सेकंड',
      it: 'Tutti Ora e 15 e ogni secondo',
      ja: '毎 時 と 15 と 毎秒',
      ko: '매 시 와 15 와 매초',
      pt: 'Toda Hora no minuto 15 : cada segundo',
      ru: 'Каждый Час и 15 и каждую секунду',
      tg: 'Ҳар Соат дар 15 ва ҳар сония',
      uk: 'Кожний Година і 15 і кожну секунду',
      zh: '每 小时 : 15 : 每秒',
    },
  },
  {
    name: 'at 18:00 on the last day of the month',
    value: '0 0 18 L * ?',
    period: 'month',
    expected: {
      da: 'Hver Måned og den sidste dag og ingen specifik dag i ugen klokken 18 : 00 : 00',
      de: 'Jedes Monat den letzten Tag und keinem bestimmten Wochentag um 18 : 00 : 00',
      en: 'Every Month on the last day and no specific day of the week at 18 : 00 : 00',
      es: 'todos los Meses en el último día y ningún día de la semana en particular a las 18 : 00 : 00',
      fr: 'Tous Mois le dernier jour et aucun jour de la semaine particulier à 18 : 00 : 00',
      he: 'בכל חודש ב יום האחרון בחודש ו ללא יום בשבוע מוגדר ב שעה 18 : 00 : 00',
      hi: 'हर महीना के अंतिम दिन और कोई विशेष सप्ताह नहीं को 18 : 00 : 00',
      it: "Tutti Mese l'ultimo giorno e nessun giorno della settimana specifico alle 18 : 00 : 00",
      ja: '毎 月 の 最終日 と 特定の曜日はなし の 18 : 00 : 00',
      ko: '매 월 의 마지막 날 및 특정한 요일 없음 의 18 : 00 : 00',
      pt: 'Todo(a) Mês no último dia e de nenhum dia específico da semana às 18 : 00 : 00',
      ru: 'Каждый Месяц в последний день и нет определенного дня недели в 18 : 00 : 00',
      tg: 'Ҳар Моҳ дар рӯзи охирин ва рӯзи муайяни ҳафта нест дар соати 18 : 00 : 00',
      uk: 'Кожний Місяц в останній день і немає визначеного дня в 18 : 00 : 00',
      zh: '每 月 的 最后一天 和 无特定星期几 的 18 : 00 : 00',
    },
  },
  {
    name: 'at 09:30 on weekdays in January through March',
    value: '0 30 9 ? 1-3 2-6',
    period: 'year',
    expected: {
      da: 'Hvert År i jan.-mar. og ingen specifik dag og man.-fre. klokken 09 : 30 : 00',
      de: 'Jedes Jahr im Jan-Mär an keinem bestimmten Tag und Mo-Fr um 09 : 30 : 00',
      en: 'Every Year in Jan-Mar on no specific day and Mon-Fri at 09 : 30 : 00',
      es: 'todos los años en ene-mar en ningún día en particular y lun-vie a las 09 : 30 : 00',
      fr: 'Tous Année en janv.-mars à aucun jour particulier et lun.-ven. à 09 : 30 : 00',
      he: 'בכל שנה ב ינו׳-מרץ ב ללא יום מוגדר ו יום ב׳-יום ו׳ ב שעה 09 : 30 : 00',
      hi: 'हर साल में जन॰-मार्च पर कोई विशेष दिन नहीं और सोम-शुक्र को 09 : 30 : 00',
      it: 'Tutti Anno in gen-mar il nessun giorno specifico e lun-ven alle 09 : 30 : 00',
      ja: '毎 年 に 1月-3月 に 特定の日はなし と 月-金 の 09 : 30 : 00',
      ko: '매 년 에 1월-3월 에 특정한 날 없음 및 월-금 의 09 : 30 : 00',
      pt: 'Todo(a) Ano de jan.-mar. em nenhum dia específico e de seg.-sex. às 09 : 30 : 00',
      ru: 'Каждый Год в янв.-март в нет определенного дня и пн-пт в 09 : 30 : 00',
      tg: 'Ҳар Сол дар моҳҳои аз Янв то Мар дар рӯзи муайян нест ва рӯзҳои аз Дшб то Ҷмъ дар соати 09 : 30 : 00',
      uk: 'Кожний Рік в січ.-бер. в немає визначеного дня і пн-пт в 09 : 30 : 00',
      zh: '每 年 的 1月-3月 的 无特定日期 和 周一-周五 的 09 : 30 : 00',
    },
  },
]

function cronToString({ selected, period }: UseCronReturn): string {
  return [
    period.prefix.value,
    period.selected.value.text,
    period.suffix.value,
    ...selected.value.flatMap(({ prefix, text, suffix }) => [
      prefix.value,
      text.value,
      suffix.value,
    ]),
  ]
    .filter(Boolean)
    .join(' ')
}

describe.each(locales)('%s cron rendering', (locale) => {
  it.each(schedules)('$name ($value)', async ({ value, period, expected }) => {
    const cron = useCron({ locale, format: 'quartz', initialValue: value, initialPeriod: period })
    await nextTick()

    expect(cron.error.value).toBe('')
    expect(cronToString(cron)).toBe(expected[locale])
  })
})

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
      da: 'Hvert sekund',
      de: 'Jede Sekunde',
      en: 'Every Second',
      es: 'Cada segundo',
      fr: 'Chaque seconde',
      he: 'בכל שנייה',
      hi: 'हर सेकंड',
      it: 'Ogni secondo',
      ja: '毎秒',
      ko: '매초',
      pt: 'A cada segundo',
      ru: 'Каждую секунду',
      tg: 'Ҳар сония',
      uk: 'Кожну секунду',
      zh: '每秒',
    },
  },
  {
    name: 'at second 20 of every minute',
    value: '20 * * * * ?',
    period: 'q-minute',
    expected: {
      da: 'Hvert minut ved sekund 20',
      de: 'Jede Minute bei Sekunde 20',
      en: 'Every Minute at second 20',
      es: 'Cada minuto en el segundo 20',
      fr: 'Chaque minute à la seconde 20',
      he: 'בכל דקה בשנייה 20',
      hi: 'हर मिनट 20 सेकंड पर',
      it: 'Ogni minuto al secondo 20',
      ja: '毎分 20 秒',
      ko: '매분 20 초',
      pt: 'A cada minuto no segundo 20',
      ru: 'Каждую минуту на секунде 20',
      tg: 'Ҳар дақиқа дар сонияи 20',
      uk: 'Кожну хвилину на секунді 20',
      zh: '每分钟 的第 20 秒',
    },
  },
  {
    name: 'throughout minute 15 of every hour',
    value: '* 15 * * * ?',
    period: 'q-hour',
    expected: {
      da: 'Hver time ved minut 15 hvert sekund',
      de: 'Jede Stunde bei Minute 15 jede Sekunde',
      en: 'Every Hour at minute 15 every second',
      es: 'Cada hora en el minuto 15 cada segundo',
      fr: 'Chaque heure à la minute 15 chaque seconde',
      he: 'בכל שעה בדקה 15 בכל שנייה',
      hi: 'हर घंटे 15 मिनट पर हर सेकंड',
      it: 'Ogni ora al minuto 15 ogni secondo',
      ja: '毎時 15 分 毎秒',
      ko: '매시간 15 분 매초',
      pt: 'A cada hora no minuto 15 a cada segundo',
      ru: 'Каждый час на минуте 15 каждую секунду',
      tg: 'Ҳар соат дар дақиқаи 15 ҳар сония',
      uk: 'Кожну годину на хвилині 15 кожну секунду',
      zh: '每小时 的第 15 分钟 每秒',
    },
  },
  {
    name: 'at 18:00 on the last day of the month',
    value: '0 0 18 L * ?',
    period: 'month',
    expected: {
      da: 'Hver måned på den sidste dag (ugedag ikke angivet) klokken 18 : 00 : 00',
      de: 'Jeden Monat am letzten Tag (Wochentag nicht festgelegt) um 18 : 00 : 00',
      en: 'Every Month on the last day (day of week unspecified) at 18 : 00 : 00',
      es: 'Cada mes el último día del mes (día de la semana sin especificar) a las 18 : 00 : 00',
      fr: 'Chaque mois le dernier jour (jour de la semaine non précisé) à 18 : 00 : 00',
      he: 'בכל חודש ביום האחרון בחודש (לא צוין יום בשבוע) בשעה 18 : 00 : 00',
      hi: 'हर महीने अंतिम दिन (सप्ताह का दिन तय नहीं है) समय 18 : 00 : 00',
      it: "Ogni mese l'ultimo giorno (giorno della settimana non specificato) alle 18 : 00 : 00",
      ja: '毎月 の 最終日 （曜日の指定なし） の 18 : 00 : 00',
      ko: '매월 마지막 날 (요일 미지정) 18 : 00 : 00',
      pt: 'A cada mês no último dia (dia da semana não especificado) às 18 : 00 : 00',
      ru: 'Каждый месяц в последний день (день недели не задан) в 18 : 00 : 00',
      tg: 'Ҳар моҳ дар рӯзи охирин (рӯзи ҳафта муайян нашудааст) дар соати 18 : 00 : 00',
      uk: 'Кожен місяць в останній день (день тижня не задано) в 18 : 00 : 00',
      zh: '每月 的 最后一天 （未指定星期几） 的 18 : 00 : 00',
    },
  },
  {
    name: 'every 10 seconds during 09:30 on weekdays in January through March',
    value: '*/10 30 9 ? 1-3 2-6',
    period: 'year',
    expected: {
      da: 'Hvert år i jan.-mar. (dag i måneden ikke angivet) på man.-fre. klokken 09 : 30 med 10 sekunders mellemrum',
      de: 'Jedes Jahr im Jan-Mär (Tag des Monats nicht festgelegt) Mo bis Fr um 09 : 30 alle 10 Sekunden',
      en: 'Every Year in Jan-Mar (day of month unspecified) on Mon-Fri at 09 : 30 every 10 seconds',
      es: 'Cada año en ene-mar (día del mes sin especificar) de lun a vie a las 09 : 30 cada 10 segundos',
      fr: 'Chaque année en janv.-mars (jour du mois non précisé) du lun. au ven. à 09 : 30 toutes les 10 secondes',
      he: 'בכל שנה מינו׳ עד מרץ (לא צוין יום בחודש) מיום ב׳ עד יום ו׳ בשעה 09 : 30 כל 10 שניות',
      hi: 'हर साल जन॰-मार्च में (महीने की तारीख तय नहीं है) सोम-शुक्र को समय 09 : 30 हर 10 सेकंड',
      it: 'Ogni anno in gen-mar (giorno del mese non specificato) da lun a ven alle 09 : 30 ogni 10 secondi',
      ja: '毎年 1月-3月 （日付の指定なし） 月-金 の 09 : 30 10秒ごと',
      ko: '매년 1월-3월 (일자 미지정) 월-금 09 : 30 10초마다',
      pt: 'A cada ano em jan.-mar. (dia do mês não especificado) de seg. a sex. às 09 : 30 a cada 10 segundos',
      ru: 'Каждый год в янв.-март (день месяца не задан) с пн по пт в 09 : 30 с интервалом в 10 с',
      tg: 'Ҳар сол дар моҳҳои аз Янв то Мар (рӯзи моҳ муайян нашудааст) дар рӯзҳои аз Дшб то Ҷмъ дар соати 09 : 30 ҳар 10 сония',
      uk: 'Кожен рік у січ.-бер. (день місяця не задано) з пн до пт в 09 : 30 з інтервалом у 10 с',
      zh: '每年 的 1月-3月 （未指定日期） 的 周一-周五 的 09 : 30 每隔10秒',
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

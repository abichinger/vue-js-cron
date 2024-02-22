export default {
    eachPeriod: {
        eachField: {
            empty: 'every {{field.id}}',
            value: '{{value.text}}',
            range: '{{start.text}}-{{end.text}}',
            everyX: 'every {{every.value}} {{field.id}}(s)',
            everyXatY: 'every {{every.value}} {{field.id}}(s), starting at {{at.value}} {{field.id}}(s)'
        },
        monthField: {
            prefix: 'in',
            value: '{{value.alt}}',
            range: '{{start.alt}}-{{end.alt}}',
            everyXatY: 'every {{every.value}} {{field.id}}(s), starting in {{at.alt}}'
        },
        dayField: {
            prefix: 'on',
            everyXatY: 'every {{every.value}} {{field.id}}(s), starting on the {{at.alt}} of the month'
        },
        dayOfWeekField: {
            prefix: 'on',
            empty: 'every day of the week',
            value: '{{value.alt}}',
            range: '{{start.alt}}-{{end.alt}}',
            everyX: 'every {{every.value}} day(s) of the week',
            everyXatY: 'every {{every.value}} day(s) of the week, starting on {{at.alt}}',
        },
        hourField: {
            prefix: 'at'
        },
        minuteField: {
            prefix: ':'
        }
    },
    hourPeriod: {
        minuteField: {
            prefix: 'at',
            suffix: 'minute(s)',
            empty: 'every'
        }
    },
    monthPeriod: {
        dayOfWeekField: {
            prefix: 'and'
        }
    },
    yearPeriod: {
        dayOfWeekField: {
            prefix: 'and'
        }
    },
    periodPrefix: 'Every',
    periodSuffix: ''
}

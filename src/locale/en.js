export default {
    eachPeriod: {   
        eachField: {
            empty: 'every {{field.id}}',
            value: '{{value.text}}',
            range: '{{start.text}}-{{end.text}}',
            everyX: 'every {{every.value}}'
        },
        monthField: {
            prefix: 'in',
            value: '{{value.alt}}',
            range: '{{start.alt}}-{{end.alt}}',
        },
        dayField: {
            prefix: 'on'
        },
        dayOfWeekField: {
            prefix: 'on',
            empty: 'every day of the week',
            value: '{{value.alt}}',
            range: '{{start.alt}}-{{end.alt}}',
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
    }
}
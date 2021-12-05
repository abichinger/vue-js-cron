type Locale = {
    periodPrefix: string,
    periodSuffix: string
    eachPeriod: {
        eachField: {
            empty: string,
            value: string,
            range: string,
            everyX: string,
            prefix: string,
            suffix: string,
        },
        '{{fieldId}}Field': {
            empty: string,
            value: string,
            range: string,
            everyX: string,
            prefix: string,
            suffix: string,
        }
    }
    '{{periodId}}Period': {
        eachField: {
            empty: string,
            value: string,
            range: string,
            everyX: string,
            prefix: string,
            suffix: string,
        },
        '{{fieldId}}Field': {
            empty: string,
            value: string,
            range: string,
            everyX: string,
            prefix: string,
            suffix: string,
        }
    }
}
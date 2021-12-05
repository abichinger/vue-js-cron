type CronState = {
    fields: Array<{
        attrs: { 
            value: Array<number> //array item values
        },
        events: {
            input: (arg1: Array<number>) => void
        },
        id: string,
        items: Array<Object> //see type Field
        cron: string,
        selectedStr: string,
        prefix: string,
        suffix: string
    }>,
    period: {
        attrs: { 
            value: Array<string> //array of period ids
        },
        events: {
            input: (arg1: Period) => void
        },
        items: Array<Period>,
        prefix: string,
        suffix: string
    },
    error: string
}
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
            value: string //selected period id
        },
        events: {
            input: (periodId: string) => void
        },
        items: Array<Period>,
        prefix: string,
        suffix: string
    },
    error: string
}
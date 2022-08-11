type CronState = {
    fields: Array<{
        attrs: { 
            modelValue: Array<number> //array item values
        },
        events: {
            'update:model-value': (arg1: Array<number>) => void
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
            modelValue: string //selected period id
        },
        events: {
            'update:model-value': (periodId: string) => void
        },
        items: Array<Period>,
        prefix: string,
        suffix: string
    },
    error: string
}
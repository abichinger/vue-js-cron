import util from '../util'

export default () => {
    return {
        minuteItems: util.genItems(0, 59, (value) => util.pad(value, 2)),
        hourItems: util.genItems(0, 59, (value) => util.pad(value, 2)),
        dayItems: util.genItems(1, 31),
        monthItems: util.genItems(1, 12, (value) => {
            return new Date(2021, value-1, 1).toLocaleDateString('en-US', {month: 'long'})
        }),
        dayOfWeekItems: util.genItems(0, 6, (value) => {
            let date = new Date(2021, 0, 3+value) //first sunday in 2021
            return date.toLocaleDateString('en-US', {weekday: 'long'})
        })
    }
}
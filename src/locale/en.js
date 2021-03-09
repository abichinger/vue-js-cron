import util from '../util'

function genItems(min, max, textFormat=(value) => {return value+''}){
    let res = []
    for(let i of new util.Range(min, max)){
        let item = {}
        item.text = textFormat(i)
        item.value = i
        res.push(item)
    }
    return res
}

function pad(n, width){
    n = n+''
    return (n.length < width) ? new Array(width - n.length).fill('0').join('') + n : n;
}

export default {
    minuteItems: genItems(0, 59, (value) => pad(value, 2)),
    hourItems: genItems(0, 59, (value) => pad(value, 2)),
    dayItems: genItems(1, 31),
    monthItems: genItems(1, 12, (value) => {
        return new Date(2021, value-1, 1).toLocaleDateString('en-US', {month: 'long'})
    }),
    dayOfWeekItems: genItems(0, 6, (value) => {
        let date = new Date(2021, 0, 3+value) //first sunday in 2021
        return date.toLocaleDateString('en-US', {weekday: 'long'})
    })
}
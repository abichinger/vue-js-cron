// x
import util from '../util'
const { ValueColumn, CombinedColumn } = util

function strToArray(str, {min, max}){
    let number = parseInt(str)
    return (String(number) == str && number >= min && number <= max) ? [number] : null
}

function arrayToStr(arr, field){
    let {min, max} = field

    if(Math.min(arr) < min){
        return null
    }
    if(Math.max(arr) > max){
        return null
    }

    let values = arr.map((x) => {return new ValueColumn(field, x)})
    return new CombinedColumn(field, values)
}

export default {
    strToArray,
    arrayToStr
}


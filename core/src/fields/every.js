// */x
import types from '../types'
const { EveryColumn } = types

let re = /^\*\/\d+$/

function strToArray(str, {min, max}){
    if(!re.test(str)){
        return null
    }
    
    let [, everyStr] = str.split('/')
    let every = parseInt(everyStr)

    let start = every * parseInt(min/every)
    let res = []
    for(let i = start; i <= max; i+=every){
        if(i >= min){
            res.push(i)
        }
    }
    return res.length > 0 ? res : null
}

function arrayToStr(arr, field){
    let {min, max} = field

    if(arr.length < 3){
        return null
    }

    let step = arr[1] - arr[0]
    if(step <= 1){
        return null
    }

    let first = (min%step == 0) ? min : (parseInt(min/step)+1)*step
    if(arr.length != parseInt((max-first)/step)+1){
        return null
    }

    for(let value of arr){
        if(value%step != 0){
            return null
        }
    }

    return new EveryColumn(field, step)
}

export default {
    strToArray,
    arrayToStr
}


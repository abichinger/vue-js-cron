// */x
import types from '../types'
const { EveryColumn } = types

let re = /^(\*|\d+)\/\d+$/

function strToArray(str, {min, max}){
    if(!re.test(str)){
        return null
    }

    let start = null
    let [beginAtStr, everyStr] = str.split('/')
    let every = parseInt(everyStr)

    if (beginAtStr !== '*') {
        start = parseInt(beginAtStr)
    } else {
        start = every * parseInt(min/every)
    }

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

    let step = arr[2] - arr[1]
    if(step <= 1){
        return null
    }

    let first = (min%step == 0) ? min : (parseInt(min/step)+1)*step
    if(arr.length != parseInt((max-first)/step)+1){
        return null
    }

    let lastVal = arr[0]
    for(let value of arr){

        if (lastVal === value) {
            continue
        } else {
            if (value-lastVal !== step) {
                return null
            }
        }
        lastVal = value
    }

    return new EveryColumn(field, step)
}

export default {
    strToArray,
    arrayToStr
}


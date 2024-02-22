// x/y
import types from '../types'
const { EveryAtColumn } = types

let re = /^\d+\/\d+$/

function buildArray(min, max, at, every) {
    let res = []
    for(let i = at; i <= max; i+=every){
        if(i >= min){
            res.push(i)
        }
    }
    return res.length > 0 ? res : null
}

function strToArray(str, {min, max}){
    if(!re.test(str)){
        return null
    }

    let [atStr, everyStr] = str.split('/')
    let at = parseInt(atStr)
    let every = parseInt(everyStr)

    return buildArray(min, max, at, every)
}

function arrayToStr(arr, field){
    let {min, max} = field

    if(arr.length < 3){
        return null
    }

    let firstStep = arr[1] - arr[0]
    let secondStep = arr[2] - arr[1]
    if(secondStep <= 1){
        return null
    }

    let at = arr[0]

    if (firstStep < secondStep && (arr[1] - secondStep) < min) {
        at = arr[1] - secondStep
    }
    let computedArray = buildArray(min, max, at, secondStep)

    if (arr.length !== computedArray.length) {
        return null
    }

    let missing = arr.filter((i) => !computedArray.includes(i))
    if (missing.length > 0) {
        return null
    }

    return new EveryAtColumn(field, secondStep, at)
}

export default {
    strToArray,
    arrayToStr
}


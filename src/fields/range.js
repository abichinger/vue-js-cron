import util from '../util'

// x-y

let re = /^\d+-\d+$/

function strToArray(str, {min, max}){
    if(!re.test(str)){
        return null
    }

    let range = str.split('-')
    let start = parseInt(range[0])
    let end = parseInt(range[1])

    if(start > end || start < min || end > max){
        return null
    }

    return util.range(start, end)
}

function arrayToStr(arr, {min, max}){
    
    if(arr.length <= 1){
        return null
    }

    let minValue = arr[0]
    let maxValue = arr[arr.length-1]

    if(minValue < min){
        return null
    }
    if(maxValue > max){
        return null
    }

    let ranges = []
    let start = 0
    for(let i = 0; i < arr.length; i++){
        if(arr[i+1] === undefined || arr[i+1] - arr[i] > 1){
            if(i == start){
                ranges.push(arr[start])
            }
            else{
                ranges.push(arr[start]+'-'+arr[i])
            }
            start = i+1
        }
    }

    return ranges.join(',')
}

export default {
    strToArray,
    arrayToStr
}


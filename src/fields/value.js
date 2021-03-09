// x

function strToArray(str, {min, max}){
    let number = parseInt(str)
    return (String(number) == str && number >= min && number <= max) ? [number] : null
}

function arrayToStr(arr, {min, max}){
    if(Math.min(arr) < min){
        return null
    }
    if(Math.max(arr) > max){
        return null
    }

    return arr.join(',')
}

export default {
    strToArray,
    arrayToStr
}



// *

function strToArray(str){
    if(str != '*'){
        return null
    }
    return []
}

function arrayToStr(arr, {items}){
    if(arr.length == 0){
        return '*'
    }
    if(arr.length != items.length){
        return null
    }

    for(let item of items){
        if(!arr.includes(item.value)){
            return null
        }
    }
    return '*'
}

export default {
    strToArray,
    arrayToStr
}


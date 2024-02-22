// x,y,z

import any from './any'
import every from './every'
import everyAt from './everyAt'
import range from './range'
import value from './value'

let fieldTypes = [any, every, everyAt, range, value]

function strToArray(str, field){
    let fields = str.split(',')
    let res = []
    for(let f of fields){
        if(f == '*'){
            return []
        }

        let values = null
        for(let fieldType of fieldTypes){
            values = fieldType.strToArray(f, field)
            if(values !== null){
                break
            }
        }
        if(values === null){
            return null
        }
        res.push(...values)
    }
    return Array.from(new Set(res))
}

function arrayToStr(arr, field){
    for(let fieldType of fieldTypes){
        let value = fieldType.arrayToStr(arr, field)
        if(value){
            return value
        }
    }
    return null
}

export default {
    strToArray,
    arrayToStr
}


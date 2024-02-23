// x,y,z

import any from './any'
import every from './every'
import everyAt from './everyAt'
import range from './range'
import value from './value'



// let fieldTypes = [any, every, everyAt, range, value]

export class MultipleColumns {

    constructor(enableEveryAt){
        this._enableEveryAt = null
        this.enableEveryAt = enableEveryAt
    }

    get enableEveryAt(){
        return this._enableEveryAt
    }

    set enableEveryAt(value) {
        this._enableEveryAt = !!value
    }

    get fieldTypes() {
        if (this.enableEveryAt) {
            return [any, every, everyAt, range, value]
        } else {
            return [any, every, range, value]
        }
    }

    strToArray(str, field){
        let fields = str.split(',')
        let res = []
        for(let f of fields){
            if(f == '*'){
                return []
            }

            let values = null
            for(let fieldType of this.fieldTypes){
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

    arrayToStr(arr, field){
        for(let fieldType of this.fieldTypes){
            let value = fieldType.arrayToStr(arr, field)
            if(value){
                return value
            }
        }
        return null
    }
}

// export MultipleColumns


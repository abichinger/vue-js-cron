import Mustache from 'mustache'
import locale from './locale'
const {getLocaleStr} = locale


class Field {

    /**
     *
     * @param {String} name
     * @param {Array} items
     */
    constructor(id, items){
        this.id = id
        this.items = items

        this.itemMap = this.items.reduce((acc, item) => {
            acc[item.value] = item
            return acc
        }, {})
    }

    get min(){
        return this.items[0].value
    }

    get max(){
        return this.items[this.items.length-1].value
    }

    getItem(value){
        return this.itemMap[value]
    }

}

class CronColumn{

    /**
     *
     * @param {Field} field
     */
    constructor(field){
        this.field = field
    }

    get localeKey(){
        return 'value'
    }

    get localeParams(){
        return {}
    }

    get value(){
        return '*'
    }

    getText(locale, periodId){
        let str = getLocaleStr(locale, periodId, this.field.id, this.localeKey)
        let params = this.populate(this.localeParams)
        return Mustache.render(str, params)
    }

    getItem(value){
        return this.field.getItem(value)
    }

    populate(obj){
        for(const [key, itemValue] of Object.entries(obj)){
            obj[key] = this.getItem(itemValue)
        }
        obj.field = this.field
        return obj
    }
}

class AnyColumn extends CronColumn {

    get localeKey(){
        return 'empty'
    }

    get value(){
        return '*'
    }

}

class RangeColumn extends CronColumn {

    constructor(field, start, end){
        super(field)
        this.start = start
        this.end = end
    }

    get localeKey(){
        return 'range'
    }

    get localeParams(){
        return {
            start: this.start,
            end: this.end
        }
    }

    get value(){
        return `${this.start}-${this.end}`
    }

}

class EveryColumn extends CronColumn {

    constructor(field, every){
        super(field)
        this.every = every
    }

    get localeKey(){
        return 'everyX'
    }

    get localeParams(){
        return {
            every: this.every,
        }
    }

    get value(){
        return `*/${this.every}`
    }

}

class EveryAtColumn extends CronColumn {

    constructor(field, every, at){
        super(field)
        this.every = every
        this.at = at
    }

    get localeKey(){
        return 'everyAt'
    }

    get localeParams(){
        return {
            every: this.every,
            at: this.at,
        }
    }

    get value(){
        return `${this.at}/${this.every}`
    }

}

class ValueColumn extends CronColumn {

    constructor(field, value){
        super(field)
        this.v = value
    }

    get localeKey(){
        return 'value'
    }

    get localeParams(){
        return {
            value: this.v,
        }
    }

    get value(){
        return ''+this.v
    }

}

class CombinedColumn extends CronColumn {

    constructor(field, columns=[]){
        super(field)
        this.columns = columns
    }

    addColumn(cronColumn){
        this.columns.push(cronColumn)
    }

    get value(){
        return this.columns.map((c) => c.value).join(',')
    }

    getText(locale, periodId){
        return this.columns.map((c) => c.getText(locale, periodId)).join(',')
    }

}

export default {
    Field,
    AnyColumn,
    RangeColumn,
    ValueColumn,
    EveryColumn,
    EveryAtColumn,
    CombinedColumn,
}

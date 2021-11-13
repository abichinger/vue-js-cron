

// const FieldTypes = {
//     Any: 1, //*
//     Value: 2, //x
//     Range: 3, //x-y
//     Every: 4, //*/x
//     EveryRange: 5, //x-y/z
//     Multiple: 6, //x,y,z
// }

class Field {

    /**
     * 
     * @param {String} name 
     * @param {Array} items 
     * @param {Number} rank 
     */
    constructor(name, items, rank){
        this.name = name
        this.items = items
        this.rank = rank

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

    getText(value){
        return this.itemMap[value] ? this.itemMap[value].text : undefined
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

    get value(){
        return '*'
    }

    get text(){
        return this.value
    }
}

class AnyColumn extends CronColumn {
    get value(){
        return '*'
    }

    get text(){
        return `every ${this.field.name}`
    }
}

class RangeColumn extends CronColumn {
    
    constructor(field, start, end){
        super(field)
        this.start = start
        this.end = end
    }
    
    get value(){
        return `${this.start}-${this.end}`
    }

    get text(){
        return `${this.field.getText(this.start)}-${this.field.getText(this.end)}`
    }
}

class EveryColumn extends CronColumn {

    constructor(field, every){
        super(field)
        this.every = every
    }

    get value(){
        return `*/${this.every}`
    }

    get text(){
        return `every ${this.every}`
    }
}

class ValueColumn extends CronColumn {

    constructor(field, value){
        super(field)
        this.v = value
    }

    get value(){
        return ''+this.v
    }

    get text(){
        return this.field.getText(this.v)
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

    get text(){
        return this.columns.map((c) => c.text).join(',')
    }

}

function range(start, end, step=1) {
    let r = []
    for(let i = start; i <= end; i+=step){
        r.push(i)
    }
    return r
}

class Range {
    constructor(start, end, step=1){
        this.start = start
        this.end = end
        this.step = step

        return new Proxy(this, {
            get: function (target, prop) {
                let i = (typeof prop === 'string') ? parseInt(prop) : prop
                if(typeof i == 'number' && i >= 0 && i <= target.length){
                    return target.start+target.step*i
                }
                return Reflect.get(...arguments)
            }
        })
    }

    get length(){
        return parseInt((this.end-this.start)/this.step)+1
    }

    [Symbol.iterator]() {
        var index = -1
        return {
            next: () => {
                return { value: this[++index], done: !(this[index+1] !== undefined) }
            }
        }
    }
}

function getValue(params, key){
    let keys = key.split('.')
    let value = params
    for(let k of keys){
        value = value[k]
    }
    return value
}

function format(str, params){
    let re = /\{\{\S+\}\}/gm
    let m
    while((m = re.exec(str)) !== null){
        let key = m[0].substring(2, m[0].length-2)
        let value = getValue(params, key)
        str = str.substr(0, m.index) + value + str.substr(m.index+m[0].length)
        re.lastIndex = m.index
    }
    return str    
}

function genItems(min, max, textFormat=(value) => {return value+''}){
    let res = []
    for(let i of new Range(min, max)){
        let item = {}
        item.text = textFormat(i)
        item.value = i
        res.push(item)
    }
    return res
}

function pad(n, width){
    n = n+''
    return (n.length < width) ? new Array(width - n.length).fill('0').join('') + n : n;
}

export default {
    range,
    Range,
    format,
    Field,
    AnyColumn,
    RangeColumn,
    ValueColumn,
    EveryColumn,
    CombinedColumn,
    genItems,
    pad
}
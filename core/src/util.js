
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

function genItems(min, max, genText=(value) => {return value+''}, genAltText=(value) => {return value+''}){
    let res = []
    for(let i of new Range(min, max)){
        let item = {}
        item.text = genText(i)
        item.alt = genAltText(i)
        item.value = i
        res.push(item)
    }
    return res
}

function pad(n, width){
    n = n+''
    return (n.length < width) ? new Array(width - n.length).fill('0').join('') + n : n;
}

function isObject(obj){
    return (obj && typeof obj == 'object' && !Array.isArray(obj))
}

function deepMerge(target, ...sources){
    if(!isObject(target) || sources.length == 0) return
    let source = sources.shift()

    if(isObject(source)){
        for(let [key, value] of Object.entries(source)){
            if(isObject(value)){
                if(!isObject(target[key])){
                    target[key] = {}
                }
                deepMerge(target[key], source[key])
            }
            
            else {
                target[key] = source[key]
            }
        }
    }

    if(sources.length > 0) deepMerge(target, sources)
    return target
}

export default {
    range,
    Range,
    format,
    genItems,
    pad,
    deepMerge,
    isObject
}
import en from './en'
import util from '../util'
const {genItems, pad} = util

const locales = {
    en: en
}

function traverse(obj, ...keys){
    if(keys.length == 0)
        return obj
        
    for(let key of keys[0]){
        if(obj.hasOwnProperty(key)){
            let res = traverse(obj[key], ...keys.slice(1))
            if(res !== undefined){
                return res
            }
        }
    }
    return
}

export default {
    getLocale: (locale) => {
        if(locales.hasOwnProperty(locale)){
            return locales[locale]
        }
        else {
            return locales['en']
        }
    },

    getLocaleStr: (locale, periodId, fieldId, localeKey) => {
        return traverse(locale, [periodId+'Period', 'eachPeriod'], [fieldId+'Field', 'eachField'], [localeKey]) || ''
    },

    getPrefix: (locale, periodId, fieldId) => {
        return traverse(locale, [periodId+'Period', 'eachPeriod'], [fieldId+'Field', 'eachField'], ['prefix']) || ''
    },

    getSuffix: (locale, periodId, fieldId) => {
        return traverse(locale, [periodId+'Period', 'eachPeriod'], [fieldId+'Field', 'eachField'], ['suffix']) || ''
    },
    
    defaultItems: (locale) => {
        return {
            minuteItems: genItems(0, 59, (value) => pad(value, 2)),
            hourItems: genItems(0, 59, (value) => pad(value, 2)),
            dayItems: genItems(1, 31),
            monthItems: genItems(1, 12, (value) => {
                return new Date(2021, value-1, 1).toLocaleDateString(locale, {month: 'long'})
            }, (value) => {
                return new Date(2021, value-1, 1).toLocaleDateString(locale, {month: 'short'})
            }),
            dayOfWeekItems: genItems(0, 6, (value) => {
                let date = new Date(2021, 0, 3+value) //first sunday in 2021
                return date.toLocaleDateString(locale, {weekday: 'long'})
            }, (value) => {
                let date = new Date(2021, 0, 3+value) //first sunday in 2021
                return date.toLocaleDateString(locale, {weekday: 'short'})
            })
        }
    },
}
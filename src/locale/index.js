import en from './en'

const locales = {
    en: en
}

export default {
    getLocale: (locale) => {
        if(locales.hasOwnProperty(locale)){
            return locales[locale]()
        }
        else {
            return locales['en']()
        }
    }
}
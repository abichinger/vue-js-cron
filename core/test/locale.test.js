import l from "../src/locale";
const { getLocale, getLocaleStr } = l

test('test getLocaleStr', () => {
    let en = getLocale('en')

    expect(getLocaleStr(en, 'year', 'minute', 'empty')).toBe('every {{field.id}}')
    expect(getLocaleStr(en, 'year', 'dayOfWeek', 'prefix')).toBe('and')
    expect(getLocaleStr(en, 'each', 'minute', 'prefix')).toBe(':')
});
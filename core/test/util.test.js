import util from '../src/util'
const { format, Range } = util

test('test format', () => {
    expect(format("Hello World")).toBe('Hello World')
    expect(format("Hello {{name}}", {name:'World'})).toBe('Hello World')
    expect(format("Point: ({{p.x}}, {{p.y}})", {p:{x:0,y:1}})).toBe('Point: (0, 1)')
    expect(format("{{0}}, {{1}}, {{0}}", ['apple', 'orange'])).toBe('apple, orange, apple')
});

test('test Range', () => {
    let r = new Range(0, 10, 2)
    expect(r[0]).toBe(0)
    expect(r[5]).toBe(10)
    expect(Array.from(r)).toEqual([0,2,4,6,8,10])
});

test('test deepMerge', () => {
    expect(util.deepMerge({ a: { a: 1 } }, { a: { b: 1 }, b: 1 })).toEqual({ a: { a: 1, b: 1 }, b: 1 })
    expect(util.deepMerge({}, { a: { b: 1 }})).toEqual({ a: { b: 1 }})
    expect(util.deepMerge({ a: { b: 1 }}, { a: { b: 2 }})).toEqual({ a: { b: 2 }})
})
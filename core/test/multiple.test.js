import multiple from '../src/fields/multiple'
import util from '../src/util'
import types from '../src/types'
const {strToArray, arrayToStr} = multiple
const {Range,genItems} = util
const {Field} = types

const r = (min, max) => {
    return new Field('', genItems(min, max))
}

test('test strToArray', () => {
    expect(strToArray('*', r(1, 3))).toEqual([]);
    expect(strToArray('1,3,5', r(0, 24))).toEqual([1,3,5]);
    expect(strToArray('*/5', r(0, 11))).toEqual([0,5,10]);
    expect(strToArray('*/5', r(1, 11))).toEqual([5,10]);
    expect(strToArray('10-15', r(0, 59))).toEqual([10,11,12,13,14,15]);
    expect(strToArray('10-11,20-22,30-33', r(0, 59))).toEqual([10,11,20,21,22,30,31,32,33]);
    expect(strToArray('5,7-8', r(0, 59))).toEqual([5,7,8]);
    expect(strToArray('5/10', r(0, 59))).toEqual([5, 15, 25, 35, 45, 55]);

    expect(strToArray('x', r(0, 59))).toBe(null);
    expect(strToArray('1-100', r(0, 59))).toBe(null);
    expect(strToArray('0-10', r(1, 59))).toBe(null);
    expect(strToArray('100', r(0, 59))).toBe(null);
    expect(strToArray('0', r(1, 10))).toBe(null);
    expect(strToArray('*/90', r(1, 10))).toBe(null);
});

test('test arrayToStr', () => {
    expect(arrayToStr([1,10], r(1, 10)).value).toEqual('1,10');
    expect(arrayToStr([1,2,3], r(1, 10)).value).toEqual('1-3');
    expect(arrayToStr([2,4,6], r(1, 10)).value).toEqual('2,4,6');
    expect(arrayToStr([], r(1, 3)).value).toEqual('*');
    expect(arrayToStr([1,2,3], r(1, 3)).value).toEqual('*');
    expect(arrayToStr([0,5,10], r(0, 10)).value).toEqual('*/5');
    expect(arrayToStr([7,14,21,28], r(5, 30)).value).toEqual('*/7');
    expect(arrayToStr([0,5,10], r(0, 20)).value).toEqual('0,5,10');
    expect(arrayToStr([1,2,5,8,9,10], r(1, 10)).value).toEqual('1-2,5,8-10');
    expect(arrayToStr([5, 15, 25, 35, 45, 55], r(0, 59)).value).toEqual('5/10');
});
import {MultipleColumns} from '../src/fields/multiple'
import util from '../src/util'
import types from '../src/types'
const {Range,genItems} = util
const {Field} = types

const r = (min, max) => {
    return new Field('', genItems(min, max))
}

test('test strToArray', () => {
    let multiple = new MultipleColumns(false)
    expect(multiple.strToArray('*', r(1, 3))).toEqual([]);
    expect(multiple.strToArray('1,3,5', r(0, 24))).toEqual([1,3,5]);
    expect(multiple.strToArray('*/5', r(0, 11))).toEqual([0,5,10]);
    expect(multiple.strToArray('*/5', r(1, 11))).toEqual([5,10]);
    expect(multiple.strToArray('10-15', r(0, 59))).toEqual([10,11,12,13,14,15]);
    expect(multiple.strToArray('10-11,20-22,30-33', r(0, 59))).toEqual([10,11,20,21,22,30,31,32,33]);
    expect(multiple.strToArray('5,7-8', r(0, 59))).toEqual([5,7,8]);

    expect(multiple.strToArray('x', r(0, 59))).toBe(null);
    expect(multiple.strToArray('1-100', r(0, 59))).toBe(null);
    expect(multiple.strToArray('0-10', r(1, 59))).toBe(null);
    expect(multiple.strToArray('100', r(0, 59))).toBe(null);
    expect(multiple.strToArray('0', r(1, 10))).toBe(null);
    expect(multiple.strToArray('*/90', r(1, 10))).toBe(null);
});

test('test arrayToStr', () => {
    let multiple = new MultipleColumns(false)
    expect(multiple.arrayToStr([1,10], r(1, 10)).value).toEqual('1,10');
    expect(multiple.arrayToStr([1,2,3], r(1, 10)).value).toEqual('1-3');
    expect(multiple.arrayToStr([2,4,6], r(1, 10)).value).toEqual('2,4,6');
    expect(multiple.arrayToStr([], r(1, 3)).value).toEqual('*');
    expect(multiple.arrayToStr([1,2,3], r(1, 3)).value).toEqual('*');
    expect(multiple.arrayToStr([0,5,10], r(0, 10)).value).toEqual('*/5');
    expect(multiple.arrayToStr([7,14,21,28], r(5, 30)).value).toEqual('*/7');
    expect(multiple.arrayToStr([0,5,10], r(0, 20)).value).toEqual('0,5,10');
    expect(multiple.arrayToStr([1,2,5,8,9,10], r(1, 10)).value).toEqual('1-2,5,8-10');
});

test('test every-at strToArray', () => {
    let multiple = new MultipleColumns(true)
    expect(multiple.strToArray('5/10', r(0, 59))).toEqual([5, 15, 25, 35, 45, 55]);
    expect(multiple.strToArray('5/10', r(8, 59))).toEqual([15, 25, 35, 45, 55]);
    expect(multiple.strToArray('3/8', r(7, 59))).toEqual([11, 19, 27, 35, 43, 51, 59]);

});

test('test every-at arrayToStr', () => {
    let multiple = new MultipleColumns(true)
    expect(multiple.arrayToStr([5, 15, 25, 35, 45, 55], r(0, 59)).value).toEqual('5/10');
    expect(multiple.arrayToStr([15, 25, 35, 45, 55], r(10, 59)).value).toEqual('15/10');
});

---
title: util
---

# util

## Usage

```js
import core from '@vue-js-cron/core'
const { util } = core
```

## Functions

<dl>
<dt><a href="#toText">toText(value)</a> ⇒ <code>string</code></dt>
<dd><p>type definition</p>
</dd>
<dt><a href="#genItems">genItems(min, max, genText, genAltText)</a> ⇒ <code>Array.&lt;{value:number, text:string, alt:string}&gt;</code></dt>
<dd><p>generate items for fields</p>
</dd>
<dt><a href="#pad">pad(n, width)</a> ⇒ <code>string</code></dt>
<dd><p>pads numbers</p>
</dd>
<dt><a href="#isObject">isObject(value)</a> ⇒ <code>Boolean</code></dt>
<dd><p>determines whether the passed value is an object</p>
</dd>
<dt><a href="#deepMerge">deepMerge(target, ...sources)</a> ⇒ <code>object</code></dt>
<dd><p>copies (deep copy) all properties from each source to target</p>
</dd>
</dl>

<a name="toText"></a>

## toText(value) ⇒ <code>string</code>
type definition

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="genItems"></a>

## genItems(min, max, genText, genAltText) ⇒ <code>Array.&lt;{value:number, text:string, alt:string}&gt;</code>
generate items for fields

**Kind**: global function  
**Returns**: <code>Array.&lt;{value:number, text:string, alt:string}&gt;</code> - array of items  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | first value |
| max | <code>number</code> | last value |
| genText | [<code>toText</code>](#toText) | returns a string representation of value |
| genAltText | [<code>toText</code>](#toText) | returns an alternative string representation of value |

<a name="pad"></a>

## pad(n, width) ⇒ <code>string</code>
pads numbers

**Kind**: global function  
**Returns**: <code>string</code> - the padded number  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | number to pad |
| width | <code>number</code> |  |

**Example**  
```js
//returns "001"
util.pad(1,3) 
```
<a name="isObject"></a>

## isObject(value) ⇒ <code>Boolean</code>
determines whether the passed value is an object

**Kind**: global function  
**Returns**: <code>Boolean</code> - true if value is an object, otherwise false  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="deepMerge"></a>

## deepMerge(target, ...sources) ⇒ <code>object</code>
copies (deep copy) all properties from each source to target

**Kind**: global function  
**Returns**: <code>object</code> - target  

| Param | Type |
| --- | --- |
| target | <code>object</code> | 
| ...sources | <code>object</code> | 


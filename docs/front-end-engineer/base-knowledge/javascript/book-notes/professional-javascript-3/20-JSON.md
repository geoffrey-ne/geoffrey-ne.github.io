---
title: Javascript高级程序设计（第三版）
subtitle: JSON学习笔记
author: wangyunfei
date: 2019-10-21
tags: [fe, javascript]
---

JSON 是一种数据格式，而不是一种语言。JSON 相比 XML 具有更简洁的语法，更加方便的解析能力。

- JSON 里没有变量；
- javascript 中内置了 JSON 模块操作 JSON；
- 使用时需要解析及序列化。

## 20.1 语法

JSON 语法可以表示三种类型值：

- 简单值：数值、字符串、布尔值、null；
- 对象：有序的键值对；
- 数组：有序列表。

#### 简单值

比如：`5`、`"Hello World!"`、`true`、`null`。JSON 中的字符串必须使用双引号。

#### 对象

JSON 中对象的属性必须加双引号。同一对象中绝对不应该出现两个同名属性。

```JSON
{
    "name": "Nicholas",
    "age": 29,
    "school": {
        "name": "Merrimack Colleage",
        "location": "North Andover, MA"
    }
}
```

## 20.2 解析与序列化

早起解析 JSON 都是使用 eval()函数，但是 eval()会引入安全问题。对于早期浏览器可以使用 shim：`https://github.com/douglascrockford/JSON-js`。而高版本中(IE8+)原生支持了 JSON 对象。

### 1、序列化 - JSON.stringify()

```javascript
var book = {
  title: 'Professional Javascript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011,
  toJSON: function() {
    return this.title
  },
}
var jsonText1 = JSON.stringify(book) // "{"title":"Professional Javascript","authors":["Nicholas C. Zakas"],"edition":3,"year":2011}"

var jsonText2 = JSON.stringify(book, ['title', 'edition']) // "{"title":"Professional Javascript","edition":3}"

var jsonText3 = JSON.stringify(book, function(key, value) {
  switch (key) {
    case 'authors':
      return value.join(',')
    case 'year':
      return 5000
    case 'edition':
      return undefined
    default:
      return value
  }
}) // "{"title":"Professional Javascript","authors":"Nicholas C. Zakas","year":5000}"
```

stringify()需要注意：

- 默认输出的 JSON 字符串不包含任何空格字符或缩进；
- 所有函数及原型成员都会被有意忽略；
- 值为`undefined`的属性也会被跳过；

#### 序列化参数

序列化支持传入过滤器（数组或方法）选项。如示例中所示，数组中可以列出只包含的属性，达到过滤的效果。同时，你也可以传入一个过滤方法，方法接收两个参数：属性名和属性值，针对不同的属性名做不同的处理。

字符串缩进：stringify 第三个参数支持传入缩进选项。可以传入数字，代表缩进空格数；也可以传入字符串，代表将此字符设置为制表符。

```javascript
JSON.stringify(book, null, 4)

// "{
//     "title": "Professional Javascript",
//     "authors": [
//         "Nicholas C. Zakas"
//     ],
//     "edition": 3,
//     "year": 2011
// }"

JSON.stringify(book, null, '--')

// "{
// --"title": "Professional Javascript",
// --"authors": [
// ----"Nicholas C. Zakas"
// --],
// --"edition": 3,
// --"year": 2011
// }"
```

toJSON 方法可以满足对象自定义序列化需求。

```javascript
var book = {
  title: 'Professional Javascript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011,
  toJSON: function() {
    return this.title
  },
}

JSON.stringify(book) // "Professional Javascript"
```

### 2、解析 - JSON.parse()

parse 方法也可以接收一个另一个函数参数(也称为还原函数)用作解析方法。该方法同样接收两个参数：属性名和属性值，用于针对不同属性做不同处理。

```javascript
var book = {
  title: 'Professional Javascript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2011, 11, 1),
}

var jsonText = JSON.stringify(book)

var bookCopy = JSON.parse(jsonText, function(key, value) {
  if (key === 'releaseDate') {
    return new Date(value)
  } else {
    return value
  }
})

alert(bookCopy.releaseDate.getFulleYear()) // bookCopy.releaseDate对Date类型对象，可以直接调用方法。
```

## 20.3 总结

- JSON 是一个轻量级的数据格式，不是一种语言；
- JSON 使用 Javascript 语法的子集表示对象、数组、字符串、数值、布尔值、null；
- ECMAScript 5 定义了原生的 JSON 对象。可以使用 JSON.stringify()和 JSON.parse()序列化和解析对象；这两个方法都有一些选项，通过它们可以改变过滤方式，或者序列化过程。

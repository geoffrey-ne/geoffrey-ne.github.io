---
title: Javascript高级程序设计（第三版）
subtitle: 面向对象的程序设计学习笔记
author: wangyunfei
date: 2019-12-05
tags: [fe, javascript]
---

面向对象语言的一个标志是类的概念，通过类可以创建任意多个具有相同属性和方法的对象；
ECMAScript 中没有类的概念，而它的对象与基于类的语言对象有所不同。

ECMA-262 将对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”这说明了：

- 对象是一组没有特定顺序的值；
- 对象的属性或方法都有一个名字，而每个名字都映射到一个值；

我们可以把对象想象成散列表：一组名值对，其值可以是数据或者函数。

## 6.1 理解对象

创建对象：

```javascript
var person = new Object()
person.name = 'Nicholas'
person.age = 29

person.sayName = function() {
  alert(this.name)
}

// 等价于

var person = {
  name: 'Nicholas',
  age: 29,
  sayName: function() {
    alert(this.name)
  },
}
```

### 6.1.1 属性类型

特性（attribute）用于描述属性（property）的各种特征，这些特性是为了实现 javascript 引擎用的，因此 js 中不能直接访问它们。

为了表示特性是内部值，规范把它们放在两队方括号中，比如`[[Enumerable]]`。

ECMAScript 包含两种属性：数据属性和访问器属性。

#### 数据属性

数据属性包含一个数据值得位置，即`[[Value]]`，可以在这个位置读取和写入值。
数据属性的四个特性：

- `[[Configurable]]`: 表示是否可以通过`delete`删除属性从而重新定义属性；能否修改属性的特性；能否将属性修改为访问器属性等；
- `[[Enumerable]]`: 能否通过 for-in 循环返回属性；
- `[[Writable]]`: 表示能否修改属性的值；
- `[[Value]]`: 表示属性的数据值。默认为 undefined。

修改属性的特性，必须使用 ECMAScript 5 的 Object.defineProperty()方法。
方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。

```javascript
var person = {}
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'Nicholas',
})

alert(person.name) // "Nicholas"
person.name = 'Greg'
alert(person.name) // "Nicholas"
```

因为将`name`属性的 writable 特性设置为 false，所以无法修改 name 的值。
在非严格模式下，赋值将被忽略；在严格模式下，赋值将抛出错误。

在调用 Oject.defineProperty()方法时，如果不指定，configurable、enumerable 和 witable 特性的默认值都是 false。

#### 访问器属性

访问器属性不包含数据值，它们包含一对 getter 和 setter 函数。
访问器属性的四个特性：

- `[[Configurable]]`: 表示是否可以通过`delete`删除属性从而重新定义属性；能否修改属性的特性；能否将属性修改为数据属性等；
- `[[Enumerable]]`: 能否通过 for-in 循环返回属性；
- `[[Get]]`: 读取访问器属性时会调用 getter 函数，这个函数负责返回有效的值；
- `[[Set]]`: 写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责决定如何处理数据。

访问器属性不能直接定义，必须使用 Object.defineProperty()来定义。

```javascript
var book = {
  _year: 2004,
  edition: 1,
}

Object.defineProperty(book, 'year', {
  get: function() {
    return this._year
  },
  set: function() {
    if (newValue > 2004) {
      this._year = newValue
      this.edition += newValue - 2004
    }
  },
})

book.year = 2005
alert(book.edition) // 2
```

getter 和 setting 并非必须指定，只指定 getter 意味着只读，只指定 setting 意味着只写。

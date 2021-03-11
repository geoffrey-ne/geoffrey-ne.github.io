---
title: Javascript高级程序设计（第三版）
subtitle: 变量、作用域和内存问题学习笔记
author: wangyunfei
date: 2019-10-29
tags: [fe, javascript]
---

Javascript 是弱类型语言，变量的值及其数据类型可以随时改变。

## 4.1 基本类型和引用类型的值

基本数据类型：`Undefined`、`Null`、`Boolean`、`Number`、`String`。

js 不允许直接操作内存。操作对象都是操作对象的引用而不是实际对象。

### 4.1.1 动态的属性

引用类型可以添加属性和方法，也可以改变和删除属性和方法。但是基本类型不可以。

```javascript
var person = new Object()
person.name = 'Nicholas'
alert(person.name) // "Nicholas"

var name = 'Nicholas'
name.age = 27
alert(name.name) // undefined
```

### 4.1.2 复制变量值

复制基本类型会在变量对象上创建新值，然后把值复制到为新变量分配的位置上，新旧变量可以参与任何操作而不互相影响。

复制引用对象时，同样会在变量对象中创建新变量并分配空间。不同的是，复制的值是一个指向堆中对象的一个引用。通过任一引用改变堆内对象都会影响另一个变量。

### 4.1.3 传递参数

所有函数的参数都是按值传递的。把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。这就是说：基本类型复制值，引用类型复制了指针。

```javascript
function setName(obj) {
  obj.name = 'Nicholas'
  obj = new Object()
  obj.name = 'Greg'
}

var person = new Object()
setName(person)
alert(person.name) // "Nicholas"
```

### 4.1.4 类型检测

基本类型检测使用`typeof`最合适。

```javascript
var s = 'Nicholas'
var b = true
var i = 22
var u
var n = null
var o = new Object()

typeof s // string
typeof b // boolean
typeof i // number
typeof u // undefined
typeof n // Object
typeof o // Object
```

检测引用类型时，如果想确定它是什么类型对象，使用`instanceof`更合适。

```javascript
person instanceof Object
colors instanceof Array
pattern instanceof RegExp
```

## 4.2 执行环境及作用域

#### 执行环境与变量对象

执行环境（也称为作用域）定义了变量或函数有权访问的其他数据。

每个执行环境都有一个与之关联的`变量对象`，环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境。在 web 中，全局执行环境是 window。

某个执行环境中的所有代码执行完毕后，该环境被销毁。保存在其中的变量和函数也随之销毁。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数环境就会被推入一个环境栈中。函数执行完毕，栈弹出环境，把控制权返回给之前的执行环境。

#### 作用域链

当代码在一个环境中执行时，会创建变量对象的一个作用域链，其用途是保证对执行环境有权访问的所有变量和函数的有序访问。

作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果环境是函数，则将其`活动对象`作为变量对象。活动对象起初只包含 arguments 对象。

作用域链中的下一个变量来自包含（外部）环境，再下一个变量对象来自下一个包含，一直延续到全局环境。

标识符解析是沿着作用域链一级一级地搜索标识符的过程。

```javascript
var color = 'blue'

function changeColor() {
  var anotherColor = 'red'

  function swapColors() {
    var tempColor = anotherColor
    anotherColor = color
    color = tempColor
    // 这里可以访问 color anotherColor tempColor
  }
  // 这里可以访问 color anotherColor
  swapColors()
}
// 这里可以访问 color
changeColor()
```

内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境的任何变量和函数。

### 4.2.1 延长作用域链

- try-catch 语句的 catch 块；
- with 语句。

### 4.2.2 没有块级作用域

```javascript
if (true) {
  var color = 'blue'
}
alert(color) // 'blue' color被添加到全局，所以在if执行完之后没有销毁

for (var i = 0; i < 10; i++) {
  doSomething(i)
}
alert(i) // 10 i同样被添加到了全局
```

#### 1. 声明变量

`var`声明的变量会被自动添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境。

如果初始化时没有使用 var 声明，则该变量会自动添加到全局环境中。

```javascript
function add(num1, num2) {
  var sum = num1 + num2
  return sum
}

var result = add(10, 20)
alert(sum) // sum使用var声明，所以会添加到函数环境中，外部无法访问。如果去掉var则此处可以访问
```

#### 2. 查询标识符

标识符搜索过程就是从作用域前端开始，向上逐级查询与给定名字匹配的标识符。如果整个搜索过程都没有找到，意味着变量尚未声明。

## 4.3 垃圾收集

javascript 具有自动垃圾收集机制。开发人员不用关心内存使用问题。垃圾回收的原理就是：找到不再使用的变量，然后释放其内存。

### 4.3.1 标记清除

垃圾收集器在运行时会给存储在内存中的所有变量都加上标记。然后，去掉环境中变量以及被环境中的变量引用的变量的标记。
而在此之后再加上标记的变量将被视为准备删除的变量，因为环境中已经无法访问到这些变量了。最后垃圾收集器会销毁带标记的值并回收它们所占用的内存空间。

### 4.3.2 引用计数

引用计数不太常见。其思路是：当声明可一个变量并将一个引用类型值赋给该变量时，这个值得引用次数就加 1；
相反如果包含这个值得引用改变到另一个值，这个值就减 1。当值为 0 时，说明这个值无法访问了，因此就可以回收了。

这个策略在循环引用时会导致内存永远无法回收。

```javascript
function problem() {
  var objectA = new Object()
  var objectB = new Object()

  objectA.someOtherObject = objectB
  ObjectB.anotherObject = objectA
}
```

IE8 及以下浏览器中的 DOM 和 BOM 对象都是使用的 C++的 COM 对象形式实现的。而 COM 正是引用计数策略回收垃圾的。

所以只要在这些浏览器中涉及 COM 对象，就会存在循环引用的问题。

```javascript
var element = document.getElementById('some_element')
var myObject = new Object()
myObject.element = element
element.someObject = myObject
```

IE9 把 BOM 和 DOM 对象都转换成了真正的 javascript 对象。这样就消除了常见的内存泄漏现象。

### 4.3.3 性能问题

垃圾回收的时间间隔确定是一个非常重要的问题。

之前 IE 是根据内存分配量运行的，比如达到某个临界值，就运行垃圾回收机制。这有个严重的问题就是如果某段代码的实际内存使用量就是超过了临界值，就会使垃圾收集器不停的运行，引发严重的性能问题。IE7 以后将触发垃圾收集的变量分配、字面量或数组元素的临界值调整为动态修正。

### 4.3.4 管理内存

分配给 web 的内存通常比桌面应用少。所以需要确保占用最少的内存让页面获得更好的性能。

`解除引用`就是通过将其值设置为 null 来释放其引用。

```javascript
function createPerson(name) {
  var localPerson = new Object()
  localPerson.name = name
  return localPerson
}

var globalPerson = createPerson('Nicholas')
// 手动解除引用
globalPerson = null
```

## 4.4 小结

- 变量有两种类型：基本类型（Undefined、Null、Boolean、Number、String）和引用类型；
- 基本类型保存在栈内存中，复制基本类型会创建这个值的副本；
- 引用类型值是对象，保存在堆内存中，复制引用类型，是复制指针的值的副本；
- 确定基本类型值使用 typeof，确定引用类型使用 instanceof；

- 所有变量都存在于一个执行环境（也称为作用域）当中，执行环境有全局和函数执行环境之分；
- 每次进入一个新的执行环境都会创建一个用于搜索变量和函数的作用域链；
- 局部环境可以沿着作用域链依次访问其包含环境，乃至全局环境中的变量；
- 变量执行环境有助于确认何时释放内存。

- javascript 不需要开发者维护内存，具有自动垃圾回收机制；
- 标记清除是目前主流回收算法，其主要思想是给当前不使用的值加上标记，然后再回收其内存；
- 引用计数目前 javascript 引擎都不在使用，但在 IE8 及以下，仍存在这个问题；循环引用会导致此算法下的内存永远不被回收；
- 解除变量引用有助于垃圾回收及时回收不再使用的内存。

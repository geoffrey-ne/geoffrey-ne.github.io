---
title: Javascript高级程序设计（第三版）
subtitle: 引用类型学习笔记
author: wangyunfei
date: 2019-11-07
tags: [fe, javascript]
---

# 5 引用类型

## 5.1 Object 类型

创建 Object 实例的方式有两种：`new Object()` 和 对象字面量。

```javascript
var person = new Object()
person.name = 'Nicholas'
person.age = 29

var person1 = {
  name: 'Nicholas',
  age: 29,
}
```

表达式上下文是指能够返回一个值。赋值操作符表示后面是一个值，所以左花括号表示一个表达式的开始，代表对象字面量。如果同样的花括号出现在语句上下文，则表示是一个语句块的开始。

一般访问对象属性都是用点表示法，不过，js 中也可以使用方括号语法，其好处就是可以通过变量来访问属性，如果属性名包括会导致语法错误的字符，或者属性名使用关键字或保留字，或者有空格，也可以使用方括号：

```javascript
alert(person.name)

var propertyName = 'name'
alert(person[propertyName])

person['first name'] = 'Nicholas'
```

## 5.2 Array 类型

ECMAScript 数组可以保存任意类型，其数组大小也可以动态调整。

创建数组：

```javascript
var colors = new Array()
var colors = new Array(20) // 只有一个数字时，数值会自动变为数组长度
var colors = new Array('red', 'blue') // 创建包含两个字符串的数组

// 也可以不使用new
var colors = Array(3)
// 或者使用数组字面量
var colors = ['red', 'blue', 'green']
```

访问数组元素：

```javascript
// 使用下标
colors[2] = 'green'
```

数组的`length`不是只读的。通过设置该属性，可以移除末尾数组或者增加新项(undefined)。
如果添加元素大于数组现有项数，数组就是自动增加到该索引值加 1 的长度。

### 5.2.3 栈方法

栈是一种 LIFO（Last-In-First-Out，后进先出）的数据结构。栈中项的插入和移除，只发生在栈顶。

ECMAScript 提供了 push 和 pop 方法实现栈的行为。

push 方法接收任意数量参数，把它们逐个添加到数组末尾，并返回修改后的数组长度。

pop 方法从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

```javascript
var colors = new Array()
var length = colors.push('red', 'green') // 2 推入两项，返回更新后的数组长度
length = colors.push('black') // 3

var item = colors.pop()
alert(item) // 'black'
alert(colors.length) // 2
```

### 5.2.4 队列方法

队列是一种 FIFO（First-In-First-Out，先进先出）的数据结构。队列是在列表末尾添加元素，从列表前端移除。

push 方法用于向队列末尾添加元素。从数组前端获取项的方法是`shift`。

```javascript
var colors = new Array()
var length = colors.push('red', 'green')

alert(length) // 2

var item = colors.shift()
alert(item) // 'red'
alert(colors.length) // 1
```

### 5.2.5 重排序方法

重排序方法有两个：sort() 和 reverse()。其中 reverse() 用于反转数组。

sort()方法会调用每个数组项的 toString()方法，然后比较得到的字符串，即使数组中的每项都是数值，sort() 方法比较的也是字符串。

```javascript
var values = [0, 1, 5, 10, 15]
values.sort()
alert(values) // 0, 1, 10, 15, 5
```

可见，虽然数值 5 小于 10，但是字符串比较时"10"则位于"5"前面。

sort()方法可以接收一个比较函数，比较函数接收两个参数，如果第一个参数应该位于第二参数之前，则返回一个负数；如果相等，则返回 0，如果应该在后面，则返回一个正数。

```javascript
function compare(value1, value2) {
  if (value1 < value2) {
    return 1
  } else if (value1 > value2) {
    return -1
  } else {
    return 0
  }
}

// 简化版
// function compare(value1, value2) {
//   return value2 - value2
// }

var values = [0, 1, 5, 10, 15]
values.sort(compare)
alert(values) // 15, 10, 5, 1, 0
```

sort() 和 reverse() 返回值是经过排序后的数组。

### 5.2.6 操作方法

concat() 方法会先创建一个当前数组的副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。

```javascript
var colors = ['red', 'green', 'blue']
var colors2 = colors.concat('yellow', ['black', 'brown'])

alert(colors) // red, green, blue
alert(colors2) // red, green, blue, yellow, black, brown
```

slice() 基于当前数组创建一个新数组。接收两个参数，即数组的起始和结束位置，包括起始位置，不包括结束位置。如果只有一个参数，则代表从该位置一直到数组末尾。

slice() 方法不改变原数组，如果参数中具有负值，则用数组的长度加上该数来确定位置。如果起始位置大于结束位置，返回空数组。

```javascript
var colors = ['red', 'green', 'blue', 'yellow', 'purple']

var colors2 = colors.slice(1) // green, blue, yellow, purple
var colors3 = colors.slice(1, 4) // green, blue, yellow
var colors4 = colors.slice(-2, -1)  // 等同于colors.slice(3, 4) yellow
alert(colors) = // red, green, blue, yellow, purple
```

splice() 方法可以用于删除、插入和替换，该方法会改变原数组。splice 方法始终都会返回一个数组，该数组包含从原数组中删除的项（如果未删除则返回一个空数组）。

- 删除：两个参数：起始位置，和要删除的项数；
- 插入：三个参数：起始位置，0（要删除的项），和要插入的项；
- 替换：三个参数：起始位置，要删除的项数，要插入的任意数量的项。

```javascript
var colors = ['red', 'green', 'blue']
// 删除
var removed = color.splice(0, 1)
alert(colors) // green,blue
alert(removed) // red
// 插入
removed = colors.splice(1, 0, 'yellow', 'orange')
alert(colors) // green, yellow, orange, blue
alert(removed) // 空数组
// 替换
removed = colors.splice(1, 1, 'red', 'purple')
alert(colors) // green, red, purple, orange, blue
alert(removed) // yellow, 返回数组只包含一项
```

### 5.2.7 位置方法

ECMAScript 5 为数组增加了两个位置方法：indexOf() 和 lastIndexOf()。
这两个方法都接收两个参数：查找的项和（可选）查找起始位置的索引。

查找的比较要求必须严格相等(===)。

```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
numbers.indexOf(4) // 3
numbers.lastIndexOf(4) // 5

numbers.indexOf(4, 4) // 5
numbers.lastIndexOf(4, 4) // 3

var person = { name: 'Nicholas' }
var people = [{ name: 'Nicholas' }]
var morePeople = [person]

people.indexOf(person) // -1
morePeople.indexOf(person) // 0
```

### 5.2.8 迭代方法

ECMAScript 5 为数组定义了 5 个迭代方法。每个方法都接收两个参数：运行在每一项的函数和该运行该函数的作用域对象。

传入的方法接收三个参数：数组的项、数组的索引和数组本身。

- every(): 如果传入函数每项都返回 true，则返回 true；
- filter(): 返回传入函数返回 true 的项构成的数组；
- forEach(): 对数组每一项运行给定函数，没有返回值；
- map(): 对数组每一项运行给定函数，返回每次函数调用结果组成的数组；
- some(): 如果传入函数任一项返回 true，则返回 true。

以上方法都不改变原数组。

### 5.2.9 缩小方法

reduce() 和 reduceRight() 用于迭代数组所有项，返回一个最终值。reduceRight() 是从数组最右端开始。

这两个方法都接收两个参数：作用在每一项上调用的函数和（可选的）作为缩小基础的初始值。
其中作用在每一项的函数接收 4 个参数：前一值、当前值、项的索引和数组对象，函数返回值会自动作为第一个参数传给下一项。

方法第一次迭代发生在数组的第二项上。

```javascript
var values = [1, 2, 3, 4, 5]
var sum = values.reduce(function(prev, cur, index, array) {
  return prev + cur
})
alert(sum) // 15

// reduceRight 只不过是反方向的。
```

## 5.3 Date 类型

ECMAScript 中的 Date 类型是在 java.util.Date 类基础上构建的。为此，Date 使用 UTC 国际协调时间 1970 年 1 月 1 日开始经过的毫秒数来保存日期。

- Date.parse() 方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回响应日期的毫秒数；
- Date.UTC() 方法接收年份、基于 0 的月份、天数、小时、分钟、秒、毫秒数，返回响应日期的毫秒数；
- Data.now() 返回当前日期的毫秒数。

创建日期对象：

```javascript
var now = new Date()
var someDate = new Date(Date.parse('May 25, 2004')) // 等价于 var someDate = new Date("May 25, 2004")
var y2k = new Date(Date.UTC(2000, 0)) // 等价于var y2k = new Date(2000, 0)
var nowNumber = Date.now()
```

### 5.3.1 继承的方法

Date 也重写了 toLocaleString()、toString()、valueOf()方法。其中 toLocaleString()方法会按照与浏览器设置的地区相适应的格式返回日期，而 toString()通常返回带有时区信息的日期和时间。

这两个方法在不同浏览器中返回的日期格式大相径庭，一般只用于调试。

valueOf()方法会返回日期的毫秒表示，所以可以方便比较日期值。

```javascript
var date1 = new Date(2007, 0, 1)
var date2 = new Date(2007, 1, 1)
alert(date1 < date2) // true
```

### 5.3.2 日期格式化方法

Date 类型还有很多专门用于将日期格式化为字符串的方法，但是这些方法的输出也是因浏览器而异的，因此没有哪个方法能够用在用户界面显示一致的日期信息。

### 5.3.3 日期组件方法

Date 类型的方法提供了直接取得和设置日期值中特定部分的方法。

```javascript
var now = new Date()

now.getFullYear() // 返回4位数的年份，如2007而非仅07
now.getMonth() // 返回月份，0代表1月，11代表12月
now.getDate() // 返回天数，1到31
now.getDay() // 返回星期数
now.getHours() // 返回小时数，0-23
now.getMinutes() // 分钟数，0-59
now.getSeconds() // 秒数 0-59
now.getMilliseconds() // 返回毫秒数

now.getUTCFullYear() // 获取UTC日期的年份
// ...
```

## 5.4 RegExp 类型

ECMAScript 通过 RegExp 类型支持正则表达式。

其语法如下：

var expression = / pattern / flags ;

其中，pattern 部分可以是任意正则表达式，每个正则都可以带一个或者多个标志，用于表明表达式行为。

- g：表示全局模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
- i: 匹配时忽略大小写；
- m: 多行模式，到达一行文本末尾还会继续查找下一行。

```javascript
var pattern1 = /[bc]at/i
var pattern2 = new RegExp('[bc]at', 'i')

// pattern1 2 是两个完全等价的正则表达式，匹配第一个“bat”或 “cat”，不区分大小写
```

正则表达式中的元字符：`( ) [ ] { } \ ^ $ | ? * + .`。模式中使用元字符必须转义，而构造函数创建正则接收的两个参数都是字符串，所有元字符都必须双重转义。

```javascript
var pattern1 = /\[bc\]at/
var pattern2 = new RegExp('\\[bc\\]at')

var pattern3 = /name\/age/
var pattern4 = new RegExp('name\\/age')
```

### 5.4.1 RegExp 实例属性

- global: [boolean] 表示是否设置了 g 标志；
- ignoreCase: [boolean] 表示是否设置了 i 标志；
- multiline: [boolean] 表示是否设置了 m 标志；
- lastIndex: [Number] 表示开始搜索下一个匹配项的字符位置，从 0 算起；
- source: [String] 正则表达式的字符串表示，按字面量形式，而不是构造函数中的字符串模式。

```javascript
var pattern = new RegExp('\\[bc\\]at', 'i')

alert(pattern.global) // false
alert(pattern.ignoreCase) // true
alert(pattern.multiline) // false
alert(pattern.lastIndex) // 0
alert(pattern.global) // "\[bc\]at"
```

### 5.4.2 RegExp 实例方法

#### exec() 方法

方法接收一个参数，即要应用模式的字符串。如果匹配成功返回第一匹配项信息的数组，如果没有匹配项返回 null。在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串。

方法返回的虽然是 array 的实例，但包含两个额外的属性：index 和 input。
index 表示匹配项在字符串中的位置。input 表示应用正则表达式的字符串。

如果模式中设置了全局标志（g），它每次只返回一个匹配项，多次调用会继续查找匹配项。而如果没有设置全局标志，多次调用将始终返回第一个匹配项。

```javascript
var text = 'cat, bat, sat, fat'
var pattern1 = /.at/

var matches = pattern1.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern1.lastIndex) // 0

matches = pattern1.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern1.lastIndex) // 0

var pattern2 = /.at/g

var matches = pattern2.exec(text)
console.log(matches.index) // 0
console.log(matches[0]) // cat
console.log(pattern2.lastIndex) // 3

matches = pattern2.exec(text)
console.log(matches.index) // 5
console.log(matches[0]) // bat
console.log(pattern2.lastIndex) // 8
```

#### test() 方法

方法接收一个字符串参数。匹配时返回 true，否则返回 false。

```javascript
var text = '000-00-0000'
var pattern = /\d{3}-\d{2}-\d{4}/

if (pattern.test(text)) {
  alert('The pattern was matched.')
}
```

RegExp 实例继承的 toLocaleString() 和 toString()方法都返回正则表达式的字面量，与创建正则表达式的方式无关。

```javascript
var pattern = new RegExp('\\[bc\\]at', 'gi')
alert(pattern.toString()) // /\[bc\]at/gi
alert(pattern.toLocaleString()) // /\[bc\]at/gi
```

正则表达式的 valueOf()方法返回正则表达式本身。

### 5.4.3 RegExp 构造函数属性

### 5.4.4 模式的局限性

## 5.5 Function 类型

每个函数都是 Funciton 类型的实例，与其他引用类型一样具有属性和方法。

定义函数有几种方式：

```javascript
// 函数声明
function sum(num1, num2) {
  return num1 + num2
}

// 函数表达式
var sum = function(num1, num2) {
  return num1 + num2
}

// 不推荐
var sum = new Function('num1', 'num2', 'return num1 + num2')
```

函数名仅仅是指向对象的一个指针，这与包含对象的指针没有什么不同。

```javascript
function sum(num1, num2) {
  return num1 + num2
}

alert(sum(10, 10)) // 20

var anotherSum = sum
alert(anotherSum(10, 10)) // 20

sum = null
alert(anotherSum(10, 10)) // 20
```

### 5.5.1 没有重载

在创建第二个函数时，实际上覆盖了引用第一个函数的变量。

```javascript
function addSomeNumber(num) {
  return num + 100
}

function addSomeNumber(num) {
  return num + 200
}

var result = addSomeNumber(100) // 300

var addSomeNumber1 = function(num) {
  return num + 100
}

var addSomeNumber1 = function(num) {
  return num + 200
}

var result1 = addSomeNumber1(100) // 300
```

### 5.5.2 函数声明与函数表达式

函数声明会被解析器率先读取（函数声明提升），并使其在执行任何代码之前可用。
至于函数表达式则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

```javascript
alert(sum(10, 10)) // 20
function sum(num1, num2) {
  return num1 + num2
}
```

```javascript
alert(sum(10, 10)) // unexpected identifier
var sum = function(num1, num2) {
  return num1 + num2
}
```

### 5.5.3 作为值的函数

因为函数本身就是变量，所以函数也可以作为值来使用。即函数可以作为函数参数，也可以作为函数返回值。

### 5.5.4 函数内部属性

arguments：是一个类数组对象，包含着传入函数中的所有参数。
this：引用的事函数据以执行的环境对象。

```javascript
window.color = 'red'
var o = { color: 'blue' }

function sayColor() {
  alert(this.color)
}

sayColor() // red

o.sayColor = sayColor
o.sayColor() // 'blue'
```

### 5.5.5 函数的属性和方法

每个函数都包含两个属性：length 和 prototype。length 属性表示函数希望接收的命名参数的个数。

```javascript
function sayName(name) {
  alert(name)
}
function sum(num1, num2) {
  return num1 + num2
}
alert(sayName.length) // 1
alert(sum.length) // 2
```

prototype 在第六章介绍。

caller 和 callee 不做要求。

#### 方法

每个函数都包含两个非继承而来的方法：apply()和 call()。这两个方法的用途都是在特定的作用域中调用函数，等于设置函数体内的 this 对象的值。

不同的是对于 call()方法除第一个参数是 this 值之外，其余参数都直接传递给函数；而 apply()方法第一个参数是 this 值，第二个参数是数组。

```javascript
window.color = 'red'
var o = { color: 'blue' }

function sayColor() {
  alert(this.color)
}

sayColor() // red

sayColor.call(this) // red
sayColor.call(window) // red
sayColor.call(o) // blue

// call与 apply的区别
function sayName(name) {
  alert(name)x
}

function callSum(num1, num2) {
  return sum.apply(this, [num1, num2])
}

function callSum1(num1, num2) {
  return sum.call(this, num1, num2)
}
```

ECMAScript 5 中还引入了 bind 方法，这个方法会创建一个函数实例，其 this 值会被绑到传给 bind()函数的值。

```javascript
window.color = 'red'
var o = { color: 'blue' }

function sayColor() {
  alert(this.color)
}

var objectSayColor = sayColor.bind(o)
objectSayColor() // blue
```

## 5.6 基本包装类型

为了方便操作基本类型值，ECMAScript 提供了 3 个特殊的引用类型：Boolean、Number 和 String。

每当读取一个基本类型值得时候，后台就会创建一个对应的基本包装类型的对象。

```javascript
var s1 = 'some text'
var s2 = s1.substring(2) // s1可以使用substring方法

// 可以理解为如下代码
var s1 = new String('some text')
var s2 = s1.substring(2)
s1 = null
```

自动创建的基本包装类型的对象只存在于代码的执行瞬间，然后立即销毁。这意味着无法为基本类型值添加属性和方法。

```javascript
var s1 = 'some text'
s1.color = 'red'
alert(s1.color) // undefined
```

Object 构造函数也会像工厂方法一样，根据传入值的类型不同返回相应基本包装类型的实例。

```javascript
var obj = new Object('some text')
alert(obj instanceof String) // true

var obj1 = new Object(true)
alert(obj1 instanceof Boolean) // true
```

### 5.6.1 Boolean 类型

建议永远不要使用 Boolean 对象。

Boolean 类型重写了 valueOf()方法，返回基本类型值 true 或 false；重写了 toString 方法，返回字符串“true”和 “false”。

布尔表达式中的所有对象都会被转换为 true。

```javascript
var falseObject = new Boolean(false)
var result = falseObject && true // true

var falseValue = false
result = falseValue && true // false

alert(typeof falseObject) // object
alert(typeof falseValue) // boolean
alert(falseObject instanceof Boolean) // true
alert(falseValue instanceof Boolean) // false
```

### 5.6.2 Number 类型

#### toString()

接收一个表示基数的参数，告诉函数返回几进制数值的字符串格式。

```javascript
var num = 10
alert(num.toString()) // 10
alert(num.toString(2)) // 1010
alert(num.toString(8)) // 12
alert(num.toString(10)) // 10
alert(num.toString(16)) // a
```

#### toFixed()

接收一个表示小数位数的参数，接近指定的最大小数位的值会自动舍入，返回字符串。

```javascript
var num = 10.005
alert(num.toFixed(2)) // "10.01"
```

IE8 及以下对传入 0 时，范围在{(-0.94, -0.5],[0.5, 0.94)}之间的值不能正确舍入。

#### toExponential()

返回指数(e)表示法。

```javascript
var num = 10
alert(num.toExponential(1)) // "1.0e+1"
```

#### toPrecision()

自动判断哪种格式最合适。

```javascript
var num = 99
alert(num.toPrecision(1)) // "1e+2"
alert(num.toPrecision(2)) // "99"
alert(num.toPrecision(3)) // "99.0"
```

### 5.6.3 String 类型

String 具有 length 属性，表示字符串包含多少字符，双字节字符仍然算一个字符。

#### 1. 字符方法

charAt()和 charCodeAt()用于访问字符串中特定字符的方法，两个方法都接收一个参数表示要获取的字符位置。
其中 charAt()返回字符，charCodeAt 返回字符编码。

在 IE8 及以上，可以通过索引方式访问特定字符。

```javascript
var stringValue = 'hello world'
alert(stringValue.charAt(1)) // "e"
alert(stringValue.charCodeAt(1)) // "101"
alert(stringValue[1]) // "e"
```

#### 2. 字符串操作方法

concat() 用于拼接字符串，可以接收任意多个参数，并将它们拼接在一起。目前基本不再使用，可以用"+"或者"``"代替。

slice()、substr()、substring()都可用于基于某个字符串创建子字符串。第一个参数为起始位置。

- slice() 和 substring()第二个参数指定了最后一个字符后面的位置；
- substr() 第二个参数指定的事返回字符个数。

```javascript
var s = 'hello world'

alert(s.slice(3)) // "lo world"
alert(s.substring(3)) // "lo world"
alert(s.substr(3)) // "lo world"
alert(s.slice(3, 7)) // "lo w"
alert(s.substring(3, 7)) // "lo w"
alert(s.substr(3, 7)) // "lo worl"
```

当参数为负时：

- slice()会将传入的负值与字符串长度相加；
- substr()将第一个负参数加上字符串长度，第二个负参数转换为 0；
- substring()会将所有负值都转换为 0。

```javascript
var s = 'hello world'

alert(s.slice(-3)) // s.slice(8) "rld"
alert(s.substring(-3)) // s.substring(0)  "hello world"
alert(s.substr(-3)) // s.substr(8)  "rld"
alert(s.slice(3, -4)) // s.slice(3, 7)  "lo w"
alert(s.substring(3, -4)) // s.substring(3, 0) s.substring(0, 3)  "hel"
alert(s.substr(3, -4)) // s.substr(3, 0)  ""
```

#### 3. 字符串位置方法

indexOf() 和 lastIndexOf() 用来从一个字符串中搜索给定的子字符串，并返回子字符串的位置。如果未找到，则返回 -1。
区别是 lastIndexOf 从字符串末尾向前搜索。

这两个方法都接收可选的第二个参数，表示搜索的起始位置。

```javascript
var s = 'hello world'
alert(s.indexOf('o')) // 4
alert(s.lastIndexOf('o')) // 7

alert(s.indexOf('o', 6)) // 7
alert(s.lastIndexOf('o', 6)) // 4
```

#### 4. trim()

方法用去去除字符串所有前缀及后缀的空格，返回新字符串，不修改原字符串。兼容 IE9+

```javascript
var s = ' hello world  '
var trimS = s.trim()
alert(s) // " hello world  "
alert(trimS) // "hello world"

// 可以使用正则兼容
s.replace(/(^\s*)|(\s*$)/g=, '')  // "hello world"
```

#### 5. 字符串大小写转换方法

toLowerCase()、toUpperCase() 范别用于将字符串全部转换为小写或大写。

```javascript
var s = 'hello world'
alert(s.toLowerCase()) // 'hello world'
alert(s.toUpperCase()) // 'HELLO WORLD'
alert(s.toLocaleLowerCase()) // 'hello world' 针对地区的方法
alert(s.toLocaleUpperCase()) // 'HELLO WORLD' 针对地区的方法
```

一般来说，在不知道自己代码将在哪种语言环境中运行时，使用针对地区的方法更稳妥一些。

#### 6. 字符串的模式匹配方法

match() 本质与 exec()相同。

```javascript
var text = 'cat bat sat fat'
var pattern = /.at/

// 与pattern.exec(text)相同
var matches = text.match(pattern)
alert(matches.index) // 0
alert(matches[0]) // "cat"
alert(pattern.lastIndex) // 0
```

search() 接收一个正则，返回搜索位置。

```javascript
var text = 'cat bat sat fat'
var pos = text.search(/at/) // 1
```

replace() 简化字符串替换操作。第一参数可以是 RegExp 对象，也可以是一个字符串；
第二个参数可以是字符串，也可以是函数。

第一个参数是字符串时，只会替换第一个子字符串。如果想要全部替换，唯一办法是使用正则。

```javascript
var text = 'cat bat sat fat'
var result = text.replace('at', 'ond')
alert(result) // 'cond, bat, sat, fat'

reslut = text.replace(/at/g, 'ond')
alert(result) // 'cond, bond, sond, fond'
```

第二个参数是字符串时，可以使用特殊字符序列代表指定字符串插入结果字符串中。

| 字符序列 |                     替换文本                     |
| :------- | :----------------------------------------------: |
| \$\$     |                        \$                        |
| \$&      |     匹配整个模式的子字符串 RegExp.lastMatch      |
| \$'      | 匹配的子字符串之前的子字符串 RegExp.leftContext  |
| \$\`     | 匹配的子字符串之后的子字符串 RegExp.rightContext |
| \$n      |           匹配第 n 个捕获组的子字符串            |
| \$nn     |           匹配第 nn 个捕获组的子字符串           |

第二个参数也可以是一个函数，该函数接口三个参数：模式匹配项、匹配项在字符串中的位置和原始字符串。

```javascript
function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '$quot;'
    }
  })
}
htmlEscape('<p class="greeting">Hello world!</p>')
```

split() 基于指定的分隔符将一个字符串分割成多个子字符串，并返回一个数组。
分隔符可以是字符串，也可以是正则。

split() 可以接收可选的第二个参数，用于指定数组大小。

```javascript
var colorText = 'red, blue, green, yellow'
var color1 = colorText.split(',') // ["red", "blue", "green", "yellow"]
var color2 = colorText.split(',', 2) // ["red", "blue"]
var color3 = colorText.split(/[^\,]+/) // ["", ",", ",", ",", ""]
```

#### 7. localeCompare() 方法

比对字符串在字母表中的位置。

```javascript
var s = 'yellow'
alert(s.localeCompare('brick')) // 1
alert(s.localeCompare('yellow')) // 0
alert(s.localeCompare('zoo')) // -1
```

#### 8 fromCharCode() 方法

String 构造函数的静态方法。接收一个或多个字符编码，然后转换成字符串。

```javascript
alert(String.fromCharCode(104, 101, 108, 108, 111)) // "hello"
```

## 5.7 单体内置对象

内置对象是指由 ECMAScript 实现提供的、不依赖于宿主环境的对象。例如：`Object`、`Array`和`String`。
另外还有两个单体内置对象：`Global`和`Math`。

### 5.7.1 Global 对象

不属于任何其他对象的属性和方法，最终都是 Global 对象的属性。比如：`isNaN()`、`parseInt()`等。
除此之外，Global 对象还包含一些其他方法。

#### 1. URI 编码方法

encodeURI() 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；
encodeURIComponent() 则会对任何非标准字符进行编码。

```javascript
var uri = 'http://www.wrox.com/illegal value.htm#start'

// "http://www.wrox.com/illegal%20value.htm#start"
alert(encodeURI(uri))

// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"
alert(encodeURIComponent(uri))
```

与之对应的解码方法也有两个，同样的，decodeURIComponent()能够解码使用 encodeURIComponent()编码的所有字符。

```javascript
var uri = 'http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start'

// "http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start"
alert(decodeURI(uri))

// "http://www.wrox.com/illegal value.htm#start"
alert(decodeURIComponent(uri))
```

#### 2. eval() 方法

eval() 可能会造成代码注入的安全问题，目前已不推荐使用。

eval() 方法就像一个完整的 ECMAScript 解析器，它只接受一个参数，即要执行的代码的字符串。

```javascript
var msg = 'hello world'
eval('alert(msg)')

eval('function sayHi() { alert("hi"); }')
sayHi()
```

eval() 执行的代码被认为是包含该次调用的执行环境的一部分，因此具有相同的作用域链。

eval() 中创建的变量或函数不会被提升。

严格模式下，外部访问不到 eval() 中创建的任何变量或函数。并且不能为 eval() 赋值

#### 3. Global 对象的属性

Global 还包括一些属性，如特殊的值：`undefined`、`NaN`、`Infinity`等，或者原生引用类型的构造函数：`Object`、`Function`。

#### 4. window 对象

web 浏览器都是将这个全局对象作为 window 对象的一部分加以实现的。
在全局作用域中声明的所有变量和函数都成为了 window 对象的属性。

```javascript
var color = 'red'

function sayColor() {
  alert(window.color)
}
window.sayColor() // "red"
```

### 5.7.2 Math 对象

Math 保存了数学公式和信息。

#### 1. Math 对象的属性

比如：

- `Math.PI` 代表 π 的值；
- `Math.E` 代表自然对数 e 的值；
- `Math.LOG2E` 代表以 2 为底 e 的对数；

#### 2. min() 和 max() 方法

这两个方法用于确定一组数值中的最小值和最大值，两个方法都可以接收任意个数参数。

```javascript
var max = Math.max(3, 54, 32, 16) // 54

var values = [1, 2, 7, 8]
var maxValue = Math.max.apply(Math, values) // 8
```

#### 3. 舍入方法

- Math.ceil() 向上舍入为最接近的整数；
- Math.floor() 向下舍入为最接近的整数；
- Math.round() 四舍五入；

```javascript
Math.ceil(25.9) // 26
Math.ceil(25.1) // 26

Math.round(25.5) // 26
Math.round(25.1) // 25

Math.floor(25.9) // 25
Math.floor(25.1) // 25
```

#### 4. random() 方法

返回介于 0 和 1 之间的一个随机数，不包括 0 和 1。
公式：

```javascript
// 公式：值 = Math.floor(Math.random() * 可能值得总数 + 第一个可能的值)
var num = Math.floor(Math.random() * 10 + 1)
// 1到10之间的整数
```

#### 5. 其他方法

比如：

- `Math.abs(num)` 返回 num 的绝对值；
- `Math.abs(sqrt)` 返回 num 的平方根；

## 5.8 小结

- 引用类型与类相似，但实现不同；
- Object 为基础类型，其他所有类型都 Object 继承了基本的行为；
- Array 类型是一组值得有序列表，提供了操作和转换这些值的能力；
- Date 类型提供了时间和日期的信息，及相关计算功能；
- RegExp 是 ECMAScript 支持正则表达式的一个接口；
- 函数是 Function 的实例，所以函数也是对象，所以函数也拥有方法，可能增强其行为；这正是 js 最有特色的地方；
- 基本包装类型包括：Boolean、Number、String；
- 在所有代码执行之前，作用域中就已经存在两个内置对象：Global 和 Math。大多数 ECMAScript 实现中都不能直接访问 Global 对象；
- web 浏览器中 window 对象承担了该角色；
- 全局变量和函数都是 Global 对象的属性；
- Math 用于辅助完成复杂的数学计算任务。

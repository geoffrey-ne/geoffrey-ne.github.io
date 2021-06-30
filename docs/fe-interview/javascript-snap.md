# snap 及 一些 js 细节

## 箭头函数没有 prototype 属性

```js
function giveLydiaPizza() {
  return 'Here is pizza!'
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype) // { constructor: ...}
console.log(giveLydiaChocolate.prototype) // undefined
```

## 原型及原型链

参考：https://github.com/mqyqingfeng/Blog/issues/2

![原型](~@images/prototype5.png)

- 每个函数都有一个 prototype 属性，函数的 prototype 属性指向了一个对象；
- 每个对象都有一个 proto 属性。`person.__proto__ === Person.prototype`
- 每个原型都有一个 constructor 属性指向关联的构造函数`Person === Person.prototype.constructor`

## js 词法作用域

参考：https://github.com/mqyqingfeng/Blog/issues/3

- js 使用的是词法作用域（也叫静态作用域），即函数作用域在函数定义的时候就已经确定了；
- 动态作用域是指在函数调用的时候才决定。

```javascript
var value = 1

function foo() {
  console.log(value)
}

function bar() {
  var value = 2
  foo()
}

bar()

// 结果是 1
```

## js 执行上下文

## 看代码说输出

```javascript
function a() {
  var n = 9

  function add () {
    console.log(n++)
  }

  return {
    n: n
    add: add
  }
}

var t1 = a()
console.log(t1.n)
console.log(t1.add())

var t2 = a()
console.log(t2.n)
console.log(t2.add())
```

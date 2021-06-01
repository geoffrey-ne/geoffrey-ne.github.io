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

- 每个函数都有一个 prototype 属性，函数的 prototype 属性指向了一个对象；
- 每个对象都有一个 proto 属性。`person.__proto__ === Person.prototype`
- 每个原型都有一个 constructor 属性指向关联的构造函数`Person === Person.prototype.constructor`

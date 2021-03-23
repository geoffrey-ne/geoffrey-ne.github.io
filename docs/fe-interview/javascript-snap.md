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

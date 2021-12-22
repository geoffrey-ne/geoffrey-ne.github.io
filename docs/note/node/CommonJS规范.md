# CommonJS 规范

规范都是用来解决 js 模块化问题而提出的。包括本文中的 CommonJS，以及其它规范，如 AMD、CMD、UMD、ES 模块等等。 nodejs 使用的就是 CommonJS 规范。

CommonJS 规范定义模块方式包括：`module`，`exports`，`require`。

## 模块的导出与导入

模块导出可以使用`module.exports`或者`exports`。他们都指向同一内存，`exports`只是`module.exports`所指内存的一个引用(或者可以理解为 alias)。

模块导入使用`require`，`require`实际导入的是`module.exports`内容。

```js
// test.js
exports.test = 'test' // module.exports指向的对象会添加属性{ test: 'test' }

exports = '修改了exports的指向'

// main.js
const { test } = require('test')
console.log(test) // 仍为`test`，因为实际导出的是module.exports所指向的内容
```

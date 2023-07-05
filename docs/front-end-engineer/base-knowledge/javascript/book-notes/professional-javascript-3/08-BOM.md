---
title: Javascript高级程序设计（第三版）
subtitle: BOM学习笔记
author: wangyunfei
date: 2019-10-25
tags: [fe, javascript]
---

ECMAScript 是 javascript 的核心，而在 web 中使用 Javascript，BOM（浏览器对象模型）才是真正的核心。

## 8.1 window 对象

window 对象既包括 js 访问浏览器窗口的一个接口；同事也是 ECMAScript 规定的 Global 对象。说明：

- 网页中所有对象、变量、函数，都是以 window 作为 Global 对象；
- 同时 window 也有权访问 parseInt()、Math 等全局方法。

### 8.1.1 全局作用域

全局作用域亦即 window 对象。在全局作用域中生命的变量和函数都会变成 window 对象的属性和方法。

```javascript
var age = 29
function sayAge() {
  alert(this.age)
}

alert(window.age) // 29
sayAge() // 29
window.sayAge // 29
```

定义全局对象与直接在 window 对象定义属性还是有差异的：全局变量不能通过 delete 删除，而直接定义在 window 对象的属性可以。

```javascript
var age = 29
window.color = 'red'

// IE < 9 时抛错
delete window.age // false
delete window.color // true

alert(window.age) // 29
alert(window.color) // undefined
```

这是因为 var 语句添加的 window 属性有配置[[Configurable]]特性为 false。

直接访问未生命的变量会抛异常。但是通过 window 对象查询则不会。

```javascript
// 报错
var newValue = oldValue
// 返回undefined
var newValue = window.oldValue
```

### 8.1.2 窗口关系及框架

可以通过`<frameset>`、`<frame>`标签创建框架。

- 每个框架拥有自己的 window 对象；
- frames 集合中可以用过索引（0 开始，从上到下，从左到右）或者框架名来访问 window 对象；

```html
<html>
  <head>
    <title>Frameset Example</title>
  </head>
  <frameset rows="160,*">
    <frame src="frame.htm" name="topFrame">
    <frameset cols=""50%, 50%>
      <frame src="anotherframe.htm" name="leftFrame">
      <frame src="yetanotherframe.htm" name="rightFrame">
    </frameset>
  </frameset>
</html>
```

`top` - 永远指向最外层的 window 对象；
`parent` - 指向父级 window 对象；
`self` - 指向当前 window 对象。

### 8.1.3 窗口位置

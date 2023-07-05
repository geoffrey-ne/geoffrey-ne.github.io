---
title: Expression vs Statement(2)
subtitle: 翻译 - 33个js概念：表达式和语句
description: 若开始，请至终。
author: wangyunfei
date: 2018-10-25 14:27:51
tags: [javascript, 33-js-concept]
---

## Function Expression vs Function Declarations

标题：函数表达式 vs 函数声明

作者：Paul Wilkins

原文链接：[点击](https://www.sitepoint.com/function-expressions-vs-declarations/)

正文翻译：

JavaScript有两种方式创建方法。函数声明的方式已经应用了很长时间了，但是渐渐的被函数表达式取代。

```javascript
function funcDeclaration() {
    return 'A function declearation';
}

var funcExpression = function () {
    return 'A function expression';
}
```

### 声明和表达式的区别

与`var`语句相同，函数声明会被提升到其它代码的顶部。函数表达式则不会有提升，这保证了它保持了与变量定义相同的作用域。

通常讲，函数声明和函数表达式可以互换使用。但是有时函数表达式更易读，不需要通过一个额外临时的函数名。

### 函数表达式的优势

下面几种情况下，函数表达式比函数声明更加有用：

- 用作闭包
- 用作其它函数的参数
- 用作立即执行函数

#### 创建闭包

闭包应用在你想要在函数执行前，传递参数给它。一个表现这种优势的好的例子是通过一个DOM节点列表循环。闭包允许你保持一些函数执行时不再可用的信息，比如索引值。

```javascript
function tabsHandler(index) {
    return function tabClickEvent(evt) {
        // 处理tab的逻辑
        // 变量index在这里可以被访问
    };
}

var tabs = document.querySelectorAll('.tab'),
    i;

for (i = 0; i < tabs.length; i += 1) {
    tabs[i].onclick = tabsHandler(i);
}
```

事件处理函数会在循环结束之后才可能被执行，所以需要闭包去保存循环中的正确数据。

```javascript
// 不好的代码，展示了为什么闭包是必要的
var i;

for (i = 0; i < list.length; i += 1) {
    document.querySelector('#item' + i).onclick = function doSomething(evt) {
        // 处理#item i 节点
        // 但是，当函数执行时，i的值一直是list.length
    }
}
```

在循环外部定义一个`doSomething()`函数，会让这个问题更加容易理解。

```javascript
// 不好的代码，展示了为什么闭包是必要的
var list = document.querySelectorAll('.item'),
    i,
    doSomething = function (evt) {
        // 处理#item i 节点
        // 但是，当函数执行时，i的值不再是它在循环中的值
    };

for (i = 0; i < list.length; i += 1) {
    item[i].onclick = doSomething;
}
```

解决问题的方法就是将index当做外部函数的参数，以便将值传递给内部函数。常见的情况是真正的处理函数由外部函数的return语句返回。

```javascript
// 下面代码展示了闭包的使用
var list = ['item1', 'item2', 'item3'],
    i,
    doSomethingHandler = function (itemIndex) {
        return function doSomething(evt) {
            // 现在doSomething方法可以通过itemIndex参数保持index的值，以及其它可用的变量。
            console.log('Doing something with ' + list[itemIndex]);
        };
    };

for (i = 0; i < list.length; i += 1) {
    list[i].onclick = doSomethingHandler(i);
}
```

关于闭包优势的其它示例可以在这里找到：[闭包示例的问与答](http://jibbering.com/faq/faq_notes/closures.html#clClDo)。

#### 作为函数参数

函数表达式可以直接用作函数参数，而不需要定义一个中间变量。在jQuery中常常可以看到将一个匿名函数用作函数参数，例如：

```javascript
$(document).ready(function () {
   console.log('An anonymous function'); 
});
```

同样的，当使用像`forEach()`这样的方法时，函数表达式也可以用来处理数组元素。这时的函数表达式不是必须是匿名函数。通常用一个命名表达函数的作用是一个不错的实践，并且有助于调试。

```javascript
var productIds = ['123', '456', '789'];

productIds.forEach(function showProduct(productId) {
   	// ... 
});
```

#### 立即执行函数(IIFE)

立即执行函数用来方式函数和变量污染全局作用域。函数内的所有属性都是局部的。这是一个通用的设计模式，用来防止你的代码对其它代码造成一些意想不到的、不需要的副作用。

这也是一个模块模式，将代码放在一个模块内更加利于维护。我们可以在这篇文章内更加深入的理解这个概念：[Demystifying JavaScript closures, callbacks and IIFEs](https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/)。

立即执行函数的一个例子：

```javascript
(function () {
    // code in here
}());
```

当用作一个模块，它可以让你的代码更加易于维护(easy-to-achieve)。

```javascript
var myModule = (function () {
    var privateMethod = function () {
      	console.log('A private method');  
    },
    someMethod = function () {
        console.log('A public method');
    },
    anotherMethod = function () {
        console.log('Another public method');  
    };
    
	return {
        someMethod: someMethod,
        anotherMethod: anotherMethod
    };
}());
```

### 结论

正如我们所见，函数表达式没有提供比函数声明更多的功能，但是使用它却经常让代码干净可读。它们的广泛应用让它们可能成为每个开发者的工具库。你还知道函数表达式有什么使用方式是我文中没有提到的吗？评论让我知道吧！

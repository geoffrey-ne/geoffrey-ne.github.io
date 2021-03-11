---
title: Expression vs Statement(1)
subtitle: 翻译 - 33个js概念：表达式和语句
description: 若开始，请至终。
author: wangyunfei
date: 2018-10-23 18:00:51
tags: [javascript, 33-js-concept]
---

## All you need to know about Javascript's Expressions, Statements and Expression Statements

标题：关于javascript中的表达式，语句和表达式语句，你所需要知道的一切

作者：Promise Tochi

原文链接：[点击](https://dev.to/promhize/javascript-in-depth-all-you-need-to-know-about-expressions-statements-and-expression-statements-5k2)

正文翻译：

读完这篇文章，你应该有能力详细说明下面代码是如何执行的，以及为什么它们能生效。

```javascript
{} + 1	// 1
{2} + 2	// 2
{2 + 2} + 3	// 3
{2 + 2} - 3	// -3
```

Javascript中有两大句法分类：

- 语句(Statements)
- 表达式(Expressions)

区分这两类句法的不同是十分有必要的，因为表达式可以像语句一样表现，这也是为什么我们有表达式语句。然而，语句却不能与表达式表现相同。

### 表达式

#### 表达式产出一个值

表达式是一个可以产生单一值作为结果的javascript代码片段。

一个表达式，你可以想要它多长就多长，但是它总会返回一个结果值。

```javascript
2 + 2 * 3 / 2
(Math.random() * (100 - 20)) + 20
functionCall()
window.history ? useHistory() : noHistoryFallback()
1 + 1, 2 + 2, 3 + 3
declaredVariable
true && functionCall()
true && declaredVariable
```

上面的所有代码都是表达式，并且可以出现在任何一个需要一个值的地方。所以下面代码`console.log`函数，将会接受表达式的值作为参数，输出到控制台。

````javascript
console.log(true && 2 * 9)	// 18
````

#### 表达式不需要修改状态

例如，

```javascript
const assignedVariable = 2;	// 这是一个语句， assignedVariable 代表了状态
assignedVariable + 4	// 表达式
assignedVariable * 10	// 表达式
assignedVariable - 10	// 表达式
console.log(assignedVariable)	// 2
```

尽管上述代码包含多个表达式，但是`assignedVariable`的值仍然是2。所以为什么声明语句需要在这块代码的头部，这是因为虽然函数调用是表达式，但是函数体内可以包含改变状态的语句。所以尽管`foo()`本身是一个可以返回`undefined`或者其它值的表达式，但是如果`foo`函数像下面这样写的话：

```javascript
const foo = foo () => {
    assignedVariable = 14
}
```

那么，即使`foo`函数的调用是一个表达式，它的调用同样导致了状态的改变。所以一个较好的`foo`函数和语句的重写应该像这样：

```javascript
const foo = foo () => {
    return 14	// 明确的返回值更具可读性
}
assignedVariable = foo()
```

或者更好的重写方法：

```javascript
const foo = foo (n) => {
    return n	// 明确的返回值更具可读性
}
assignedVariable = foo(14)
```

这样的写法让代码更具可读性、复用性，并且将表达式和语句清楚的分离开来。这是javascript语言声明式(declearative)和函数式(functional)写法的基础。

### 语句

语句是函数式编程里十分令人头疼的存在😄。基本上讲，语句执行操作，它们是做事情的(statements perform actions, they do things)。

在javascript中，语句永远不能用在需要一个值的地方，所以它们不能用作函数参数，右侧赋值，运算符操作，函数返回值。。。

```javascript
foo(if () {return 2})	// js引擎会报错
```

下面列出javascript中所有的语句：

1. if
2. if-else
3. while
4. do-while
5. for
6. switch
7. for-in
8. with(已废弃)
9. debugger
10. 变量声明

如果你把下面的代码输入到浏览器的控制台中，并且敲击回车

```javascript
if (true) {9+9}
```

你会发现它返回18。尽管如此，你仍然不能像一个表达式一样或者javascript中其它需要一个值的地方去使用它。这很奇怪，因为一个语句预期中应该不会返回任何值。这个返回值显得十分无用，因为你无法使用它。这是javascript给你的，很奇怪吧。

#### 函数声明，函数表达式和具名函数表达式

函数声明是一个语句

```javascript
function foo (func) {
    return func.name
}
```

函数表达式是一个表达式，通常称为匿名函数

```javascript
console.log(foo(function () {}))	// ""
```

一个具名的函数表达式与匿名函数相同，也是一个表达式，只不过它有一个名字

```javascript
console.log(foo(function myName () {}))	// "myName"
```

下面的总结有助于理解如何区分函数表达式和函数声明：

<strong>不管何时你在需要一个值的地方声明了一个函数，它会被尝试着当做一个值对待，如果它不能作为一个值，则会报错。</strong>

<strong>不管你在代码全局、模块、或者语句块中的何处（也就是说不需要一个值的地方）声明了一个方法，都会作为一个函数声明对待。</strong>

比如：

```javascript
if () {
	function foo () {}	// 代码块的最上方，声明    
}

function foo () {}	// 全局，声明

function foo () {
    function bar () {}	// 代码块的最上方，声明
}

foo(function () {})	// 匿名函数表达式

function foo () {
    return function bar () {
        function baz () {}	// 代码块的最上方，声明
    }
}

function () {}	// 语法错误：函数声明需要一个名字

if (true) {
    function () {}	// 语法错误：函数声明需要一个名字
}
```

#### 将表达式转换为语句：表达式语句

javascript使得任何事情简单明了😃

```javascript
2 + 2;	// 表达式语句
foo();	// 表达式语句
```

你可以通过在句尾添加分号的方式，将一个表达式转换成表达式语句。或者允许[automatic semi-colon insertion](https://dev.to/promhize/what-you-need-to-know-about-javascripts-automatic-semi-colon-insertion-78a)工作。`2 + 2`本身是一个表达式，但是整行是一个语句。

```javascript
2+2	// on its own is an opposition
foo(2+2)	// 所以你可以在任何需要一个值的地方使用
true ? 2+2 : 1 + 1
function foo () {return 2+2}

2+2;	// 表达式语句
foo(2+2;)	// 语法错误
```

#### 分号 vs 逗号操作符

你可以使用分号将多个表达式放在一行

```javascript
const a; function foo () {}; const b = 2
```

逗号操作符允许你将多个表达式连接(chain)在一起，只返回最后一个表达式的值

```javascript
console.log( (1+2, 3, 4) )	// 4
console.log( (2, 9/3, function () {}) )	// function () {}
console.log( (3, true ? 2+2 : 1+1) )	// 4
```

> 注：一种告诉javascript引擎这里需要一个值的方式是通过圆括号，()，如果去掉圆括号，每一个表达式都会本当做console.log函数的参数使用。

```javascript
function foo () {return 1, 2, 3, 4}
foo()	// 4
```

所有的表达式都会按照从左到右的顺序被执行，然后会返回最后一个的值。

#### 自执行函数(IIFEs: Immediately Invoked Function Expressions)

如果我们把一个匿名函数放在一个需要值的地方，那么它就可以转变为一个表达式。这意味着如果我们使用圆括号告诉javascript引擎这里需要一个值，那么可以传递一个匿名函数来当做这个值。

```javascript
function () {}
```

所以上面的代码是无效的，但是下面的代码却是有效的

```javascript
(function () {})	// 这里返回 function () {}
```

如果使用圆括号包裹一个匿名函数会返回这个函数本身，那么这意味着我们可以直接调用它，像这样：

```javascript
(function () {
    // 做一些事情
})()
```

所以，下面这些代码也是可能的

```javascript
(function () {
    console.log("immediately invoke anonymous function call")
})	// "immediately invoke anonymous function call"

(function () {
    return 3
})()	// 3

console.log((function () {
    return 3
})())	// 3

// 同样可以给立即执行函数传递参数
(function (a) {
    return a
})("I'm an argument")	// "I'm an argument"

```

#### 对象字面量 vs 块级语句

> 注：这在javascript中是合法的

```javascript
r: 2+2	// 合法的
foo()
const foo = () => {}
```

上面的代码是全局作用域下的语句列，它们会被当做合法的javascript代码并且被执行。你可以称`r`为一个标签(label)，它在中断循环上是最有用的。比如：

```javascript
// 译者注：此处没有看懂
loop: {
    for (const i = 0; i < 2;i++) {
        for (const n = 0; n < 2; n++) {
            break loop	// 中断外层循环，停止这个循环
        }
    }
}
```

你可以在任意表达式或者表达式语句前面添加标签，但是注意，这种做法不是在定义一个变量：

```javascript
lab: function a () {}
console.log(lab)	// ReferenceError: lab is not defined
```

大括号，{}，允许你将表达式语句和语句放在一起，所以你可以这样写：

```javascript
{var a = "b"; func(); 2+2}	// 4
```

将上述代码粘贴到控制台会返回4，并且当执行`console.log(a)`，会得到字符串`b`。你可以称这样代码为一个块级语句，这和对象字面量(object liteal)是有区别的。

```javascript
console.log({a: 'b'})	// {a: 'b'}
console.log({var a = "b", func(), 2+2})	// SyntaxError
const obj = {var a = "b", func(), 2+2}	// SyntaxError
```

不能把块级语句当做一个值或者一个表达式。console.log是一个方法，它不能接受一个语句作为参数。但是它可以接受对象字面量作为参数。

我希望你理解了我上面的解释，因为下面的代码可能会把你弄晕。

```javascript
{} + 1	// 1
{2} + 2	// 2
{2+2} + 3	// 3
{2+2} - 3	// -3
```

也许你期望这段代码报错或者分别返回1, 4, 7。记住，语句不会有任何返回值因为它们不能当做一个值使用。所以javascript认为，比起抛出异常，不如将它当做加法操作符的一个操作数，数字或者一个字符串，如果转换失败就会报错。所以不管块级语句返回什么，都会作为一个操作数被隐式转换为0。

Whew，如果你全部读完了，你就是真正的MVP。这或许是关于javascript中的表达式，语句和表达式语句，你所需要知道的一切。
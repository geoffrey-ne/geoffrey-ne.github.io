---
title: Value Types and Reference Types(1)
subtitle: 翻译 - 33个js概念：值类型 vs 引用类型
description: 若开始，请至终。
author: wangyunfei
date: 2018-11-19 18:00:51
tags: [javascript, 33-js-concept]

---

## Explaining Value vs. Reference in Javascript

副标题：从计算机内存的角度解释事情原委

标题：关于javascript中的值与引用的说明

作者：Arnav Aggarwal

原文链接：[点击](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)

正文翻译：

这篇文章已经被收录在我的在线课程[Step Up Your JS: A Comprehensive Guide to Intermediate JavaScript](https://www.educative.io/collection/5679346740101120/5707702298738688?authorName=Arnav%20Aggarwal)中。Feel free to [view it there](https://www.educative.io/collection/page/5679346740101120/5707702298738688/5685265389584384) for interactive code playgrounds and an online quiz。

javascript中有5种数据类型是按<strong>值</strong>传递的：`Boolean`,`null`,`undefined`,`String`,`Number`。我们将其称为基本类型(<strong>primitive types</strong>)。

javascript中有3中数据类型是按<strong>引用</strong>传递的：`Array`,`Function`,`Object`。这些类型本质上讲都是`Object`类型，所以我们将他们统称为对象(<strong>Objects</strong>)。

## 基本类型(Primitives)

如果将基础类型赋值给一个变量，我们可以认为这个变量包含了基础类型值。

```javascript
var x = 10;
var y = 'abc';
var z = null;
```

`x`值是`10`，`y`值是`'abc'`，为了加深理解，我们用一张图来表示这些变量及其值在内存中是如何存储的。

![img](https://cdn-images-1.medium.com/max/800/1*PdKLlT7zUrmDBZUOBsZh7w.png)

当我们用`=`运算符将这些变量赋值给其它变量的时候，我们把值复制给了新变量。这是值复制。

```javascript
var x = 10;
var y = 'abc';

var a = x;
var b = y;
console.log(x, y, a, b); //	-> 10, 'abc', 10, 'abc'
```

现在，`a`和`x`的值都是10，`b`和`y`的值都是`'abc'`。他们是独立的，因为他们的值是复制而来的。

![img](https://cdn-images-1.medium.com/max/800/1*MZ3AcwELYZ2ONYFg3LiTXQ.png)

修改变量中的一个，不会影响另一个。可以认为变量彼此之间没有任何关系。

```javascript
var x = 10;
var y = 'abc';

var a = x;
var b = y;

a = 5;
b = 'def';

console.log(x, y, a, b); // -> 10, 'abc', 5, 'def'
```

## 对象(Objects)

这让人困惑，但是请忍受我的唠叨并认真阅读这篇文章。读完后，这看起来似乎就很简单了。

<strong>那些不是用基本类型赋值的变量，是赋予了这个值的引用。这个引用指向了对象的内存地址。这个变量其实并不实际包含这个值。</strong>

对象创建在内存中的某处。当我们写这样的代码：`arr = []`，我们创建了一块数组内存。变量`arr`接收的是一个地址，指向实际存储位置的地址。

让我们假设`address`是一种新的数据类型，它可以像`number`或者`string`一样按值传递。`address`指向了内存空间的那个按引用传递的值的位置(An `address` points to the location, in memory, of a value that is passed by reference)。与字符串类型使用引号标记一样(`''`或者`""`)，地址会用尖括号标记，`<>`。

当我们赋值或使用一个引用类型的变量，我们会写下如下代码：

```javascript
1) var arr = [];
2) arr.push(1);
```

上面的1、2行代码在内存中的样子：

1.

![img](https://cdn-images-1.medium.com/max/800/1*h1aXuPwCyhu6GKwgeFMLDw.png)

2.

![img](https://cdn-images-1.medium.com/max/800/1*HaemMnuU05EW1b3BZPubIg.png)

注意值和地址，变量`arr`的值是固定的。真正改变的是数组在内存中的存储。当我们操作变量`arr`时，比如说添加一个值，javascript引擎找到`arr`所存储的地址，并且处理地址里保存的数据。

### 按引用赋值

当一个引用类型的值，或者一个对象，通过`=`运算符复制到另一个变量时，那个值的地址才是真正像基本类型一样被复制。<strong>对象复制的是引用，而不是值本身</strong>。

```javascript
var reference = [1];
var refCopy = reference;
```

上面的代码在内存中的样子：

![img](https://cdn-images-1.medium.com/max/800/1*d2W3ulHbHRGrFQ-c1SG5gA.png)

每个变量现在都存储了同一个数组的引用。这意味着如果我们改变了变量`reference`，这个更改在变量`refCopy`上也会被体现：

```javascript
reference.push(2);
console.log(reference, refCopy); // -> [1, 2], [1, 2]
```

![img](https://cdn-images-1.medium.com/max/800/1*RFrFRXIperg0yTwXauc97w.png)

### 引用重赋值

将一个引用类型变量重新赋值会替换旧引用。

```javascript
var obj = { first: 'reference' };
```

在内存中：

![img](https://cdn-images-1.medium.com/max/800/1*PWGp9d2zZ_QGg18HXBSq9Q.png)

当我们再添加一行代码：

```javascript
var obj = { first: 'reference' };
obj = { second: 'ref2' };
```

变量`obj`中存储的地址改变了。第一个对象仍然存储在内存中，第二个对象也同样：

![img](https://cdn-images-1.medium.com/max/800/1*1h73Wn9IyaiXbhxhmJZmYA.png)

当对象不再被引用，像上面`#234`地址那样，js引擎会启动垃圾回收机制。这意味着开发者失去了这个对象的所有引用，并且无法再使用这个对象，所以js引擎可以安全的回收这块内存。在我们的示例中，对象`{first: 'reference'}`不可再访问，仅对js引擎有效。

## == 和 ===

当我们使用`==`和`===`这些等于运算符与引用类型时，它们检测的是引用。如果变量存储的是同一地址，表达式的值将是`true`。

```javascript
var arrRef = [’Hi!’];
var arrRef2 = arrRef;

console.log(arrRef === arrRef2); // -> true
```

如果它们存储的是不同的对象，即使对象具有相同的属性，表达式依然返回`false`。

```javascript
var arr1 = ['Hi!'];
var arr2 = ['Hi!'];

console.log(arr1 === arr2); // -> false
```

如果我们有两个不同的对象，并且想要比较这两个对象是否具有相同的属性，最简单的方法是将它们都转化成字符串，然后比较这两个字符串。当等于运算符比较基础类型时，它们只是简单的检查值是否相同。

```javascript
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);

console.log(arr1str === arr2str); // true
```

另一个判断的方法是递归遍历对象，并且保存所有值都是相同的。

## 向函数传递参数

当我们向函数传递一个基本类型时，函数会将这个值复制到它的参数中。这和使用`=`一样。

```javascript
var hundred = 100;
var two = 2;

function multiply(x, y) {
    // PAUSE
    return x * y;
}

var twoHundred = multiply(hundred, two);
```

上面例子中，我们将变量`hundred`赋值为`100`。当我们将它传递给函数`multiply`时，变量`x`得到了这个值，`100`。就像`=`运算符那样，这个值被复制了。同样的，变量`hundred`的值不受影响。下面的图是代码执行到`multiply`函数中的PAUSE注释时的内存快照。

![img](https://cdn-images-1.medium.com/max/800/1*3AYcflNTwTTGTgCul0DgBw.png)

### 纯函数

我们将那些不影响外部作用域的函数称为纯函数。一个函数如果只接收基本类型值作为参数，并且未使用其外部作用域的变量，那么它本身就是一个纯函数，因为它无法影响外部作用域。纯函数内部创建的所有变量都会在函数返回时立即回收。

一个函数如果接收对象作为参数，那么它就有可能改变它外部作用域的状态。比如说函数接收了数组的引用，并且改变了其指向的数组，比如添加一个元素，那么在函数外部的那个数组也可以看到改变。当函数返回时，由函数造成的改变依然被保留了下来。这可能会造成难以追踪的非设计影响。

许多数组原生方法，包括`Array.map`和`Array.filter`，就因此设计成为一个纯函数。这些方法接收数组引用作为参数，并且在内部复制了数组的值，以此来替代原数组的操作。这种思想保证了原数组未被操作，外部作用域也因而未被影响，函数返回时会返回这个复制的新数组。



让我们看一个纯函数和非纯函数区别的例子。



```javascript
function changeAgeImpure(person) {
    person.age = 25;
    return person;
}

var alex = {
    name: 'Alex',
    age: 30
};

var changedAlex = changeAgeImpure(alex);

console.log(alex); // -> { name: 'Alex', age: 25 }
console.log(changedAlex); // -> { name: 'Alex', age: 25 }
```

这个非纯函数接收了一个对象参数，并且修改了对象的`age`属性为`25`。因为是直接操作对象的引用，所以修改是直接修改在`alex`对象本身。注意，函数返回的`person`对象实际上与函数传入的参数是一个对象。`alex`与`alexChanged`具有相同的引用。这样将变量`person`返回并存储在新变量上是十分冗余的。



让我们看一看纯函数的做法。

```javascript
function changeAgePure(person) {
    var newPersonObj = JSON.parse(JSON.stringify(person));
    newPersonObj.age = 25;
    return newPersonObj;
}

var alex = {
    name: 'Alex',
    age: 30
};

var alexChanged = changeAgePure(alex);

console.log(alex); // -> { name: 'Alex', age: 30 }
console.log(alexChanged); // -> { name: 'Alex', age: 25 }
```

在这个方法中，我们使用`JSON.stringify`将对象转换成字符串，然后再用`JSON.parse`将字符串转换回对象。通过这种转换并存储在新变量上，我们可以得到一个新的对象。复制一个对象还有其它的方法，比如遍历原始对象的所有属性然后赋值给新对象上等，但是这种转换方式是最简单的。新的对象具有与原始对象相同的属性，但是在内存上又是两个完全不同的对象。

当我们修改新对象的`age`属性时，原始对象不会受到任何影响，函数是纯函数，它无法影响本身作用域之外的任何对象，即使是传入函数中的那个对象。新的对象需要被返回并存储在新的变量上，否则当函数执行接受后会被垃圾回收，因为对象已经不在作用域当中。

## 自测

值与引用的概念在面试中常常会被问道。尝试给出下面代码的输出值。

```javascript
function changeAgeAndReference(person) {
    person.age = 25;
    person = {
        name: 'John',
        age: 50
    };
    
    return person;
}

var personObj1 = {
    name: 'Alex',
    age: 30
};

var personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> ?
console.log(personObj2); // -> ?
```

这个方法起始改变了传入的原始对象的`age`属性。然后它将变量重新赋值了一个全新的对象，并且将其返回。这是两个对象输出的结果。

```javascript
console.log(personObj1); // -> { name: 'Alex', age: 25 }
console.log(personObj2); // -> { name: 'John', age: 50 }
```

记住，通过函数参数进行赋值与`=`赋值基本相同，函数中的`person`变量存储的是对象`personObj1`的引用，所以最初的修改将直接作用于`personObj1`上。一旦我们将一个新对象赋值给`person`，那么操作`person`将不再影响原始对象。

对`person`的重赋值并不会影响作用域外`personObj1`指向的对象。`person`保存的引用改变了是因为被重新赋值了，但是重赋值对`personObj1`没有影响。

上述代码的等价形式是应该这样的：

```javascript
var personObj1 = {
    name: 'Alex',
    age: 30
};

var person = personObj1;
person.age = 25;

person = {
  name: 'john',
  age: 50
};

var personObj2 = person;

console.log(personObj1); // -> { name: 'Alex', age: 25 }
console.log(personObj2); // -> { name: 'John', age: '50' }
```

唯一的区别就是当我们使用函数的时候，函数执行结束之后，`person`就不再存在在作用域里了。
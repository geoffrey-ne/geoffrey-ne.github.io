---
title: TypeScript - 基础
subtitle: 学习笔记
author: wangyunfei
date: 2019-10-31
tags: [fe, TypeScript]
---

# TypeScript - 基础

## 1 原始数据类型

### 布尔值

```typescript
let isDone: boolean = false

// 使用构造函数Boolean创造的对象不是布尔值
let createdByNewBoolean: boolean = new Boolean(1)

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

let createdByNewBoolean: Boolean = new Boolean(1) // correct

let createdByBoolean: boolean = Boolean(1) // correct
```

### 数值

```typescript
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010
// ES6 中的八进制表示法
let octalLiteral: number = 0o744
let notANumber: number = NaN
let infinityNumber: number = Infinity

// 编译后
var decLiteral = 6
var hexLiteral = 0xf00d
// ES6 中的二进制表示法
var binaryLiteral = 10
// ES6 中的八进制表示法
var octalLiteral = 484
var notANumber = NaN
var infinityNumber = Infinity
```

`0b1010`和 `0o744`是 ES6 中二进制和八进制表示法，它们会被编译为十进制数字。

### 字符串

```typescript
let myName: string = 'Tom'
let myAge: number = 25

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`

// 编译结果

var myName = 'Tom'
var myAge = 25
// 模板字符串
var sentence =
  'Hello, my name is ' +
  myName +
  ".\nI'll be " +
  (myAge + 1) +
  ' years old next month.'
```

### 空值

空值(void)可以用于表示没有任何返回值的函数，其它地方使用没有意义，比如声明变量，因为你只能将它赋值为 `undefined` 和 `null`。

### Null 和 Undefined

`undefined` 和 `null` 是所有类型的子类型，也就是说可以将其赋值给其它类型的变量。

```typescript
// 这样不会报错
let num: number = undefined

// 这样也不会报错
let u: undefined
let num: number = u

// 而void不可以
let u: void
let num: number = u

// Type 'void' is not assignable to type 'number'.
```

## 2 任意值

- 使用`any`类型，允许被赋值为任意类型；
- 可以访问任何属性和方法，对它的任何操作，返回内容的类型也是任意值；
- 未声明类型的变量会被识别为任意值类型。

```typescript
let myFavoriteNumber: string = 'seven'
myFavoriteNumber = 7

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

let myFavoriteNumber: any = 'seven'
myFavoriteNumber = 7 // correct

// 访问任何属性及方法
let anyThing: any = 'Tom'
anyThing.setName('Jerry')
anyThing.setName('Jerry').sayHello()
anyThing.myName.setFirstName('Cat')

// 自动识别为let something: any;
let something
something = 'seven'
something = 7

something.setName('Tom')
```

## 3 类型推论

在没有明确指定一个类型时候推测出一个类型，就是类型推论。

```typescript
let myFavoriteNumber = 'seven' // which equal with `let myFavoriteNumber: string = 'seven'`
myFavoriteNumber = 7

// error TS2322: Type 'number' is not assignable to type 'string'.

let myFavoriteNumber // which equal with `let myFavoriteNumber: any`
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

## 4 联合类型

使用`|` 分隔类型，表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
myFavoriteNumber = true // error TS2322: Type 'boolean' is not assignable to type 'string | number'.
```

- 当访问联合类型的属性时，只能访问此联合类型里所有类型共有的属性或方法；
- 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型。

```typescript
function getLength(something: string | number): number {
  return something.length // error TS2339: Property 'length' does not exist on type 'string | number'.
}

function getString(something: string | number): string {
  return something.toString()
}

let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
console.log(myFavoriteNumber.length) // 推断出是一个string类型
myFavoriteNumber = 7
console.log(myFavoriteNumber.length) // 推断出是一个number类型，所以会报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

## 5 对象的类型 —— 接口

使用接口(interface)来定义对象的类型。

ts 中的接口概念不仅仅可用于对类的一部分行为进行抽象，也常用于对「对象的形状」进行描述。

```typescript
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

### 可选属性

```typescript
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
}

let lucy: Person = {
  name: 'lucy',
  age: 12,
}
```

### 任意属性

```typescript
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male',
}
```

`一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。`

```typescript
interface Person {
  name: string
  age?: number
  [propName: string]: string
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
}
// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

### 只读属性

使用`readonly`修饰属性，限制对象初始化时，必须同时初始化属性值。

```typescript
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male',
}

tom.id = 9527 // error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.

let tom: Person = {
  name: 'Tom',
  gender: 'male',
} // error Property 'id' is missing in type '{ name: string; gender: string; }'.

tom.id = 89757 // error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

## 6 数组的类型

我们可以用`类型 + 方括号`表示数组，也可以使用泛型

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5]
fibonacci.push('8')

// Argument of type '"8"' is not assignable to parameter of type 'number'.

// 使用any
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }]

// 数组泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5]
```

### 使用接口的方式表示数组及类数组

类数组(Array like Object)本身并不是数组类型，比如 arguments，它不能用普通数组方式描述。类数组就可以解决这个问题

```typescript
//接口方式描述数组
interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5]

function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}
```

typescript 也提供了内置对象，用于描述 arguments。

```typescript
function sum() {
  let args: IArguments = arguments
}
```

## 7 函数的类型

### 函数声明

```typescript
function sum(x: number, y: number): number {
  return x + y
}
```

### 函数表达书

```typescript
let mySum: (x: number, y: number) => number = function(
  x: number,
  y: number,
): number {
  return x + y
}
```

### 使用接口定义函数的形状

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, sunString: string) {
  return source.search(subString) !== -1
}
```

### 可选参数

可选参数必须放在必须参数后面。

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}

let tomcat = buildName('Tom', 'Cat')
let tom = buildName('Tom')
```

### 默认参数

```typescript
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}

let tomcat = buildName('Tom', 'Cat')
let tomcat2 = buildName(undefined, 'Cat')
```

### 剩余参数

剩余参数是一个数组

```typescript
function fush(array: any[]. ...items: any[]) {
  items.forEach(function(item) {
    array.push(item)
  })
}

let a = [];
push(a, 1, 2, 3)
```

### 重载

```typescript
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join(''),
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  }
}
```

## 8 类型断言

Type Assertion 可以手动指定一个联合类型的值的类型。

### 语法

```
<类型>值

或者

值 as 类型
```

```typescript
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
```

注意：

- 类型断言不是类型转换；
- 不能断言成一个联合类型中不存在的值。

```typescript
function toBoolean(something: string | number): boolean {
  return <boolean>something
}

// index.ts(2,10): error TS2352: Type 'string | number' cannot be converted to type 'boolean'.
//   Type 'number' is not comparable to type 'boolean'.
```

## 9 内置对象

Boolean、Error、Date、RegExp 等。

### ECMAScript 的内置对象

```typescript
let b: Boolean = new Boolean(1)
let e: Error = new Error('Error occurred')
let d: Date = new Date()
let r: RegExp = /[a-z]/
```

### DOM 和 BOM 的内置对象

Document、HTMLElement、Event、NodeList 等。

```TypeScript
let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
})
```

### TypeScript 核心库的定义文件

```typescript
Math.pow(10, '2')

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

// TypeScript 核心库的定义
interface Math {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number): number
}
```

### 用 Typescript 写 Node.js

Node.js 不是内置对象的一部分，使用时需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

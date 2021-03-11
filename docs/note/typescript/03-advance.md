---
title: TypeScript - 进阶
subtitle: 学习笔记
author: wangyunfei
date: 2019-11-04
tags: [fe, TypeScript]
---

# TypeScript - 进阶

## 1 类型别名

使用`type`可以创建类型别名。类型别名常用于联合类型。

```typescript
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

## 2 字符串字面量类型

用来约束取值只能是某几个字符串中的一个。使用`type`定义。

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll')
handleEvent(document.getElementById('world'), 'dbclick') // index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```

## 3 元组

数组合并了相同类型的值，而元组合并了不同类型的对象。

```typescript
// 直接初始化
let tom: [string, number] = ['Tom', 25]

// 或者分别赋值
let tom: [string, number]
tom[0] = 'Tom'

// 如果直接对元组整体进行初始化或者赋值时，必须提供所有元组类型中指定的项。
let tom: [string, number]
tom = ['Tom']

// Property '1' is missing in type '[string]' but required in type '[string, number]'.
```

### 越界元素

添加越界元素时，它的类型被限制为元组中每个类型的联合类型。

```typescript
let tom: [string, number]
tom = ['Tom', 25]
tom.push('male')
tom.push(true)

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

## 4 枚举

Enum 用于取值被限定在一定范围内的场景，枚举成员会被赋值为从`0`开始递增的数字。

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days['Sun'] === 0) // true
console.log(Days['Mon'] === 1) // true
console.log(Days['Tue'] === 2) // true
console.log(Days['Sat'] === 6) // true

console.log(Days[0] === 'Sun') // true
console.log(Days[1] === 'Mon') // true
console.log(Days[2] === 'Tue') // true
console.log(Days[6] === 'Sat') // true
```

### 手动赋值

可以手动更改枚举类型的值，未赋值的项会接着上一个枚举项递增。

```typescript
enum Days {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days['Sun'] === 7) // true
console.log(Days['Mon'] === 1) // true
console.log(Days['Tue'] === 2) // true
console.log(Days['Sat'] === 6) // true
```

也可以赋值为小数或者负数，后续未赋值的项递增步长仍为 1。

```typescript
enum Days {
  Sun = 7,
  Mon = 1.5,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days['Sun'] === 7) // true
console.log(Days['Mon'] === 1.5) // true
console.log(Days['Tue'] === 2.5) // true
console.log(Days['Sat'] === 6.5) // true
```

### 计算所得项

计算所得项之后的项必须手动赋值，因为它无法自动获取初始值。

```typescript
enum Color {
  Red,
  Green,
  Blue = 'blue'.length,
} // correct

enum Color {
  Red = 'red'.length,
  Green,
  Blue,
}

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

### 常数枚举

常数枚举是指用`const`修饰的枚举类型，它会在编译阶段被删除，并且不能包含计算成员。

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

// 编译后
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

// 不能包含计算成员
const enum Color {
  Red,
  Green,
  Blue = 'blue'.length,
}

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

### 外部枚举

是指使用`declare enum`定义的枚举类型。只用于编译时的检查，编译后删除。

```typescript
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

// 编译后

var directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
```

## 5 类

### public private 和 protected

- public 公有，任何地方都可以被访问，默认所有属性和方法都是 public；
- private 私有，不能在声明它的类的外部访问；
- protected 受保护的，它在子类中是允许被访问的。

```typescript
// private
class Animal {
  private name
  public constructor(name) {
    this.name = name
  }
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

需注意，编译后的代码，并没有限制`private`属性在外部的可访问性。

```typescript
// protected
class Animal {
  public name
  protected constructor(name) {
    this.name = name
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name)
  }
}

let a = new Animal('Jack') // 类只允许被继承，不允许直接使用

// index.ts(13,9): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

### readonly

只读，只允许在构造函数中初始化一次。

```typescript
class Animal {
  readonly name
  public constructor(name) {
    this.name = name
  }
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

### 抽象类

抽象类不允许被实例化，抽象类中的抽象方法必须被子类实现。

```typescript
abstract class Animal {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}

let cat = new Cat('Tom')
```

### 类的类型

```typescript
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi(): string {
    return `My name is ${this.name}`
  }
}

let a: Animal = new Animal('Jack')
console.log(a.sayHi())
```

## 6 类与接口

类可以实现一个或多个接口，使用`implements`来表示。

```typescript
interface Alarm {
  alert()
}

interface Light {
  lightOn()
  lightOff()
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}
```

### 接口继承接口

```typescript
interface Alarm {
  alert()
}

interface LightableAlarm extends Alarm {
  lightOn()
  lightOff()
}
```

### 接口继承类

```typescript
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
```

### 混合类型

```typescript
// 具有自己属性和方法的函数
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}
  counter.interval = 123
  counter.reset = function() {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

## 7 泛型

Generics 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'x') // ['x', 'x', 'x']
createArray(3, 'x') // ['x', 'x', 'x']
// 以上两种均是正确的，因为有类型推论
```

### 多个类型参数

定义泛型的时候，可以一次定义多个。

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]
```

### 泛型约束

在函数内部使用泛型变量的时候，由于不能事先知道它具有哪些属性及方法，所以不能随意使用。我们可以使用接口对泛型进行约束。

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

多个参数之间也可以互相约束。

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 })
```

### 泛型接口

```typescript
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<any>
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```

### 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}
```

### 泛型参数的默认类型

在 TypeScript 2.3 以后，可以指定默认泛型类型。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

## 8 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型。

### 函数的合并

函数合并其实就是重载。

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

### 接口合并

```typescript
interface Alarm {
  price: number
}
interface Alarm {
  weight: number
}

// 等价于
interface Alarm {
  price: number
  weight: number
}

// 合并类型不能有冲突
interface Alarm {
  price: number
}
interface Alarm {
  price: string // 类型不一致，会报错
  weight: number
}

// index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
```

### 类的合并

与接口合并的规则一致。

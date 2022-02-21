# Everyday Types

> docs: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

## string,number,boolean

三个最常用的内置类型。`number`不会区分`int`或者`float`。

`String`、`Number`、`Boolean`大写字母开头的写法也是合法的，但它们代表了代码中几乎不会使用的内置类型。始终使用`string`、`number`、`boolean`类型就可以了。

## Arrays

数组类型。`number[]`或者`Array<number>`。注意`[number]`代表元组。

## any

`any`是 typescript 中的特殊类型，它可以用在任何位置，赋予任何类型。像字面一样，哪里都不会错。

没有声明类型，并且 ts 无法从上下文推断出类型的时候，编译器会将其默认转为的`any`。但是这样无法进行类型检测，就不会报错。如果这不是你想要的，使用`noImplicitAny`配置禁用这种隐式转换。

## Type Annotations on Variables

变量上的类型声明。你可以显式的给变量声明类型。但是大多数时候这是没有必要的，ts 会尽量推断出变量当前类型。

```typescript
// 两者一致
let myName: string = 'Alice'
let myName = 'Alice'
```

## Function

函数，是 js 中主要传递数据的工具。ts 支持你定义函数入参和返回值的类型。

函数的入参，如果声明了入参类型，ts 就会检测。即使不声明类型，ts 也会检测参数个数是否正确。

函数的返回值。一般不需要明确声明返回值类型，ts 会自动判断出。

匿名函数及箭头函数出现在需要接受函数的地方是，入参类型可以被自动推断出

```typescript
// No type annotations here, but TypeScript can spot the bug
const names = ['Alice', 'Bob', 'Eve']

// Contextual typing for function
names.forEach(function(s) {
  console.log(s.toUppercase())
  // Error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
})
```

## Object Types

对象类型，最常见的类型。

```typescript
// The parameter's type annotation is an object type
// 对象之间用分号或者逗号分割；属性类型声明也是可选的，默认是any
// 加问号表示可选参数
function printCoord(pt: { x: number; y: number; z?: number }) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
  console.log(pt?.z)
}
printCoord({ x: 3, y: 7 })
```

## Union Types

联合类型，声明一个类型可能是多个类型中的任意一个。

```typescript
function printId(id: number | string) {
  console.log(id.toUpperCase())
  // Property 'toUpperCase' does not exist on type 'string | number'.
  //Property 'toUpperCase' does not exist on type 'number'.
}

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3)
}
```

访问联合类型的属性或者方法，必须是其所有可能类型都支持，才被允许，比如上面示例中，`number`不支持`toUpperCase`方法，所以会报错。而`number[]`和`string`都支持`slice`方法，所以正确。

## Type Aliases

类型别名，允许为一个已声明的类型赋予新的名称，然后在需要此类型的地方复用类型名。使用类型别名和使用真正类型没有任何区别。

```typescript
type Point = {
  x: number
  y: number
}
type ID = number | string
// 给原生类型其个别名也是OK的
type UserInputSanitizedString = string
let userInput: UserInputSanitizedString = 'input'
// Can still be re-assigned with a string though
userInput = 'new input'
```

## Interfaces

接口类型，是另一种声明一个对象类型的方法。

```typescript
interface Point {
  x: number
  y: number
}
```

typescript 之所以称为类型系统，是因为其只关心类型的结构和能力，

## type 与 interface 的区别

- type 无法实现声明合并，interface 可以（声明合并，同名扩展）；
- type 可以给基础类型起别名，interface 不可以；

## Type Assertions

类型断言，有时候你可能比 ts 编译系统知道更详细的类型，这时，你可以使用`as`或者`<>`将类型转为你需要的类型

```typescript
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement

const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas')
```

类型断言与类型声明一致，都会在编译阶段被去掉。不会影响代码功能。

ts 只允许将类型断言为更详细的类型，但是你可以使用`any`或者`unknown`来破坏这种限制。

```typescript
// error: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const x = 'hello' as number
// correct
const a = (expr as any) as T
```

## Literal Types

字面量类型，作为`number`和`string`类型的补充，字面量类型允许更加具体的说明一个类型的值。

```typescript
// alignment的类型更加具体
function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}
```

当你定义对象的时候，类型系统通常认为其属性的值是可改变的，比如：

```typescript
const obj = {
  counter: 0,
  method: 'GET',
}
```

这里的`counter`和`method`属性，会被认为`number`和`string`类型，而不是`0`和`GET`字面量类型。

有两种方式改变这种行为，第一种是使用类型断言。第二种是使用`as const`。

```typescript
const obj = {
  counter: 0,
  method: 'GET' as 'GET',
}

const obj = {
  counter: 0,
  method: 'GET',
} as const
```

## null and undefined

js 中有两个原始值表示不存在或者未初始化：`null`和`undefined`。在 ts 中，有这两个值的对应类型。这两个类型的表现取决于`strictNullChecks`配置。

当`strictNullChecks`打开的时候(`on`)，你必须确保变量不是`null`或者`undefined`，才能访问其方法或属性。

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase())
  }
}
```

你可以使用`!`——非 null 断言符号，来表示一个类型不是 null 或者 undefined。

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}
```

## Enums

枚举类型，不仅仅是添加到类型，而是实实在在被编译到运行时的代码。它描述一个值，其可能是一组命名常量之一。更多关于枚举内容，详见：[enums](https://www.typescriptlang.org/docs/handbook/enums.html)

```typescript
export enum AccountType {
  FormalAccount = 1,
  TestAccount = 2,
}
```

## Less Common Primitives

较少通用的基本类型

### bigint

ES2020 之后，`bigint`增加为 js 中的基础类型，用来表示一个非常大的数。

```typescript
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100)
```

### symbol

```typescript
const firstName = Symbol('name')
const secondName = Symbol('name')

if (firstName === secondName) {
  // error: This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```

更多 symbol 内容详见：[symbols](https://www.typescriptlang.org/docs/handbook/symbols.html)

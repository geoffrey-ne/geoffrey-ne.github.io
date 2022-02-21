# More on Functions

> docs: https://www.typescriptlang.org/docs/handbook/2/functions.html

## 定义函数类型的方式

**Function Type Expressions**

函数类型表达式: `(a: string) => void`，入参的名字是必须的。

```typescript
function greeter(fn: (a: string) => void) {
  fn('Hello, World')
}
```

**Call Signatures**

Signatures，咋翻译呢，`函数调用的形式`？。如果想定义一个具有属性的函数，可以用这种形式。主要的区别在于不是用`=>`而是`:`。

```typescript
type DescribableFunction = {
  description: string
  (someArg: number): boolean
}
```

**Construct Signatures**

`构造函数形式`?，可以声明函数必须被`new`操作符执行

```typescript
interface SomeConstructor {
  new (s: string): SomeObject
}

function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}

// 如果new不是必须的，可以在定义的时候补充进去
interface SomeConstructor {
  new (s: string): SomeObject
  (s: string): SomeObject
}
```

## Generic Functions

泛型函数，ts 中的泛型主要被用来描述几个类型之间的一致性。

```typescript
// 限制了入参和返回类型的一致性
function firstElement<Type>(arr: Type[]): Type {
  return arr[0]
}
```

**Inference**

Inference，推断能力，通常我们无需明确指定泛型的类型，ts 可以自行推断出类型。但如果需要的时候，可以明确指定。

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}

// 引发推断错误，Type被认为是number
// error: Type 'string' is not assignable to type 'number'.
const arr = combine([1, 2, 3], ['hello'])

// Specifying Type Arguments - 这时可以明确指定类型
const arr = combine<string | number>([1, 2, 3], ['hello'])
```

**Constraints**

约束，可以约束泛型至少需要满足何种形式。

```typescript
// 约束了Type必须有length属性
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}
```

**Working with Constrained Values**，这个我理解不需要特别解释吧。没记。

**泛型函数的最佳实践**

> Rule: When possible, use the type parameter itself rather than constraining it

能直接定义出来，就不要用`约束`去实现。

```typescript
// 直接定义
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}
// 使用约束
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]
}

// a: number (good)
const a = firstElement1([1, 2, 3])
// b: any (bad)
const b = firstElement2([1, 2, 3])
```

> Rule: Always use as few type parameters as possible

类型能少就少，不要定义无意义的类型。

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func)
}

// Func这个泛型一点意义都没有，完全可以由Type推断出来
function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func)
}
```

> Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

如果泛型只出现了一次，那么强烈建议你重新思考一下是否需要泛型。

```typescript
function greet<Str extends string>(s: Str) {
  console.log('Hello, ' + s)
}

// 这样就好了，无需用泛型
function greet(s: string) {
  console.log('Hello, ' + s)
}
```

## Optional Parameters

可选参数。你可以声明函数的参数是否可选，或者给一个默认值。

```typescript
function f(x?: number) {
  // ...
}
f() // OK
f(10) // OK

function f(x = 10) {
  // ...
}
```

回调函数中的可选参数。这块我理解，回调会传什么是我们已知的，至于别人是否使用这些参数是不确定的，所以我们定义回调的时候，参数本身不需要是可选的（因为我们已知，且固定会传入）。

```typescript
// 这里我们明确会给callback传第二个参数，所以index的可选是没有意义的
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}

// 而且在使用这个方法的时候，第二个参数变成了可能为空，这与实际情况不符
myForEach([1, 2, 3], (a, i) => {
  // Object is possibly 'undefined'.
  console.log(i.toFixed())
})

// 所以我们定义的时候Index无需是可选的
function myForEach(arr: any[], callback: (arg: any, index: number) => void)
// 用的人，不想用index参数的时候，不用就行了
myForEach([1, 2, 3], a => console.log(a))
```

## Function Overloads

函数重载，在函数定义上面依次写出函数重载的各个类型即可。有两点需要重点注意下。

- 函数定义里的那个声明，对外是不可见的；

```typescript
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  // ↑ 因为这个声明外部是不可见的
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}
const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
// 所以即使后两个参数是可选的，函数也无法接受两个参数类型
const d3 = makeDate(1, 3)
```

- 函数定义里的声明，必须能兼容(compatible)所有的重载。

```typescript
function fn(x: boolean): void
// Argument type isn't right
// error: This overload signature is not compatible with its implementation signature.
function fn(x: string): void
function fn(x: boolean) {}
// ↑这里没有兼容 string的情况
```

**Writing Good Overloads**

> Always prefer parameters with union types instead of overloads when possible

最佳实践：能使用联合类型定义，就不要用函数重载。

```typescript
function len(s: string): number
function len(arr: any[]): number
function len(x: any) {
  return x.length
}

len('') // OK
len([0]) // OK
len(Math.random() > 0.5 ? 'hello' : [0]) // error， No overload matches this call.

// 用联合类型就行了
function len(x: any[] | string) {
  return x.length
}
```

## Declaring this in a Function

函数中`this`的声明。没太看明白，我理解大体意思是，需要明确指出`this`的类型。我把示例放这了。有兴趣的看原文吧。

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}

const db = getDB()
// ok
const admins = db.filterUsers(function(this: User) {
  return this.admin
})
// error: The containing arrow function captures the global value of 'this'.
const admins = db.filterUsers(() => this.admin)
```

## Other Types to Know About

与函数相关的其他类型。这些类型本身也可以脱离函数使用，但是在函数中用的更多点。

**void**

`void`代表函数没有返回值，但是与`undefined`不同，`void`不严格要求函数一定不能返回任何东西，只是标记返回的东西不要使用。但是如果配置返回`undefined`类型，那么函数必须不返回任何内容。

```typescript
type voidFunc = () => void

const f1: voidFunc = () => {
  return true // 没有任何问题
}

type undefinedFunc = () => undefined

const f2: undefinedFunc = () => {
  return true // 会报错
}
```

`void`不限制真实是否有返回值，这兼容了一些虽然返回内容，但是无需使用的情景。

```typescript
const src = [1, 2, 3]
const dst = [0]

// forEach接受返回值为void类型的方法，但Array.push返回了number类型
// 没有报错，因为void不要求必须不返回
src.forEach(el => dst.push(el))
```

但是需要注意，如果字面函数定义直接声明了`void`返回类型，那么有返回值就会报错。

```typescript
function f2(): void {
  // @ts-expect-error，这样就会报错
  return true
}

const f3 = function(): void {
  // @ts-expect-error
  return true
}
```

**object**

代表了出基本类型以外的任何引用类型。函数类型也是`object`类型。

> object is not Object. Always use object!

**unknown**

与`any`类型，但是`unknown`限制了任何操作。

```typescript
function f1(a: any) {
  a.b() // OK
}
function f2(a: unknown) {
  a.b() // error: Object is of type 'unknown'.
}

function safeParse(s: string): unknown {
  return JSON.parse(s)
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString)
```

**never**

函数返回值定义了`never`的话，代表永远不会正常返回。

```typescript
function fail(msg: string): never {
  throw new Error(msg)
}
```

**Function**

`Function`类型描述了`bind`/`call`/`apply`几个属性，同时可以被调用，调用的返回值是`any`。

```typescript
function doSomething(f: Function) {
  return f(1, 2, 3)
}
```

`() => void`相对`Function`更安全一点。

## Rest Parameters and Arguments

**Rest Parameters**

剩余的形参

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map(x => n * x)
}
// 'a' gets value [10, 20, 30, 40]
// type a = number[]
const a = multiply(10, 1, 2, 3, 4)
```

**Rest Arguments**

剩余的参数

```typescript
const arr1 = [1, 2]
const arr2 = [3, 4]
arr1.push(...arr2) // ok
const angle = Math.atan2(...arr1) // error，函数拿到的是number[]，不是两个数字

const arr1 = [1, 2] as const
// OK，这样就没问题了
const angle = Math.atan2(...arr1)
```

## Parameter Destructuring

参数解构

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
}

// or
type ABC = { a: number; b: number; c: number }
function sum({ a, b, c }: ABC) {
  console.log(a + b + c)
}
```

## Assignability of Functions

就是再说`void`，看本文的`void`部分就行了。

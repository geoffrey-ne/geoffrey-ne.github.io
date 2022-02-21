# Narrowing

> docs: https://www.typescriptlang.org/docs/handbook/2/narrowing.html

在一些情况下，ts 可以根据上下文内容，将类型缩窄为更加具体的类型。

## typeof

这个好理解，我们判断一个值是否为一个类型，那其它可能性就被排除了。

```typescript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    // 我们知道 padding是number，自然就不可能是string，所以这里ts不会报错
    return ' '.repeat(padding) + input
  }
  return padding + input
}
```

但是需要注意一些坑，比如`null`也是`object`类型。

```typescript
function printAll(strs: string | string[] | null) {
  if (typeof strs === 'object') {
    // error: Object is possibly 'null'.
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  } else {
    // do nothing
  }
}
```

这也至少说明，`ts`比较严谨（嗯，官网就是这么说的哈哈）。

## Truthiness narrowing

`Truthiness`，用布尔的真假值来缩窄类型。也好理解，不是这种就是那种呗。

```typescript
function printAll(strs: string | string[] | null) {
  // 不是 null，又是object,只能是string[]了呗
  if (strs && typeof strs === 'object') {
    // 所以这里就只能是string[]
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    // 这个就更只能是string类型了
    console.log(strs)
  }
}
```

## The `in` operator narrowing

`in`可以检测属性或方法是否存在，以此来缩窄类型。

```typescript
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    // 只有有swim属性的类型才能进来，所以Bird被排除了
    return animal.swim()
  }
  // 没有swim属性的类型走到这，所以就剩Bird了
  return animal.fly()
}
```

## `instanceof` narrowing

通过类型检测来缩窄类型。原理都一样，直接看示例就行。

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // (parameter) x: Date
    console.log(x.toUTCString())
  } else {
    // (parameter) x: string
    console.log(x.toUpperCase())
  }
}
```

## Assignments

赋值运算符，为变量赋值可以缩窄类型。

```typescript
// let x: string | number
let x = Math.random() < 0.5 ? 10 : 'hello world!'
// x: number
x = 1
console.log(x)
// error: Type 'boolean' is not assignable to type 'string | number'.
x = true
// let x: string | number
console.log(x)
```

## Control flow analysis

流程控制，也可以缩窄类型。其实就是配合上面的种种方法，然后用流程控制语句缩窄类型，没啥营养这里。

## Using type predicates

这个挺有意思，使用`as`代表先转为某个类型，然后访问这个类型的属性是否存在，与`in`类型。

然后通过`is`来告诉`typescript`如何缩窄类型。

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

let pet = getSmallPet()

if (isFish(pet)) {
  // 这里可以知道pet是Fish类型，因为isFish方法声明了返回类型`pet is Fish`
  pet.swim()
} else {
  pet.fly()
}
```

## Discriminated unions

分辨联合类型。感觉这块写的挺好，但我不太会总结，最好看原文。

```typescript
// 比如我们最开始定义的Shape是这样的：圆有半径，正方形有边长
interface Shape {
  kind: 'circle' | 'square'
  radius?: number
  sideLength?: number
}
// 但是无法做到当kind为circle时，确保radius一定会有
// 可以使用`!`非null断言来解决问题
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    // `!`来说明radius一定存在
    return Math.PI * shape.radius! ** 2
  }
}

// 但是这种解决方案不够理想，其实我们没有真正限制了Shape本身在是圆形的时候一定有半径，所以我们将定义拆分

interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

// 现在Shape是一个联合类型，由`Circle`和`Square`两部分组成
// 这保证了Shape类型具有kind属性，来表示具体类型，同时kind为circle时，一定存在radius
function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      // (parameter) shape: Circle
      return Math.PI * shape.radius ** 2
    case 'square':
      // (parameter) shape: Square
      return shape.sideLength ** 2
  }
}
// 这时，ts可以根据Shape的kind属性，正确的判断出其具体类型
```

## Exhaustiveness checking

穷尽检查，或者说对于是否穷尽的限制。`never`可以做到判断其可能性是否穷尽。

```typescript
interface Triangle {
  kind: 'triangle'
  sideLength: number
}

type Shape = Circle | Square | Triangle

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      // 未处理Triangle，所以这里不应该是never就报错了，保证了穷尽
      // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck
  }
}
```

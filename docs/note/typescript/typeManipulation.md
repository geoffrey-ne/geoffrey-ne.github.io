# Type Manipulation 类型操作

## Keyof Type Operator

> docs: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

`keyof`运算符接受一个对象类型，并且返回其键的字符串(`string`)或数字字面量(`numeric literal`)的联合类型。

```typescript
type Point = { x: number; y: number }
type P = keyof Point // type P = 'x' | 'y'

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish // type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish // type M = string | number
```

注意一下`keyof Mapish`的类型是`string | number`。这是因为 js 将 对象的数字索引转换为 string 类型。

如果你需要明确指定键值是`string`类型，可以这样做。

```typescript
type StringKeys = Extract<keyof Mapish, string>

const test: StringKeys
test.toLowerCase() // no error
```

> 参考：https://stackoverflow.com/questions/51808160/keyof-inferring-string-number-when-key-is-only-a-string

## Typeof Type Operator

> docs: https://www.typescriptlang.org/docs/handbook/2/typeof-types.html

js 中的`typeof`运算符使用在表达式上下文中，并返回`string`表示其类型。 ts 中的`typeof`操作符，可以使用在类型上下文中，它接受一个变量或变量属性，并返回其类型：

```typescript
const str = 'Hello world'
// typeof in expression context, Prints "string"
console.log(typeof str)
// typeof in type context, const n: string
const n: typeof str
```

typeof 仅用来表示基本类型作用不大，将其与其它类型运算符结合使用，可以很方便的表达很多场景的类型。例如与`ReturnType<T>`结合使用。

```typescript
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate> // type K = boolean

const f = () => ({ x: 10, y: 3 })
// type P = ReturnType<f>
// ↑ error: 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?

type P = ReturnType<typeof f>
// type P = {
//   x: number
//   y: number
// }
```

使用`typeof`可以很方便的将值(values)转换为类型(types)。

限制：`typeof`只允许直接接变量或变量的属性。详见文档。

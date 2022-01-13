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

## Indexed Access Types

> docs: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

索引访问类型，可以用它来查看指定类型某一属性的类型。

```typescript
type Person = { age: number; name: string; alive: boolean }
type Age = Person['age'] // type Age = number
```

索引访问类型也是类型的一种，所以完全可以使用联合类型，`keyof`，或者其它类型代替。

但是：

- 不能使用值(values)；
- 访问不存在的索引类型会报错；

```typescript
type I1 = Person['age' | 'name'] // string | number
type I2 = Person[keyof Person] // string | number | boolean
type AliveOrName = 'alive' | 'name'
type I3 = Person[AliveOrName] // string | boolean

const key = 'age'
type Age = Person[key]

// error: Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?

type I1 = Person['alve']
// error: Property 'alve' does not exist on type 'Person'.
```

可以使用`number`的索引类型，来获取数组元素的类型。

```typescript
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
]
type Person = typeof MyArray[number] // type Person = { name: string; age: number; }
```

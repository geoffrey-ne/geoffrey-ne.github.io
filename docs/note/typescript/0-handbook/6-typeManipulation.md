# Type Manipulation 类型操作

Typescript 的类型系统十分强大，因为它允许基于一个类型来描述另一个类型。

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

使用`typeof`获取数组中内容所有类型可以这么写：

```typescript
const arr = [1, 2, '1'] as const
type ItemValue = typeof arr[number] // 这里直接写number即可
// type ItemValue = 1 | 2 | '1'
```

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

## Conditional Types

> docs: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

条件类型。在大多数程序的核心部分，我们常需要根据输入去做选择，js 程序也不例外。但是事实上那些值很容易根据输入类型而推断出。条件类型可以用来描述输入与输出的关系。

```typescript
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}

type Example1 = Dog extends Animal ? number : string // type Example1 = number
type Example2 = RegExp extends Animal ? number : string // type Example2 = string
```

条件类型的形式与 js 中的条件表达式有点相似：

```typescript
SomeType extends OtherType ? TrueType: FalseType;
```

如果`extends`左边的类型可以赋给右边就会走到`TrueType`分支，否则走到`FalseType`分支。

上面示例中的条件类型可能无法直接展现其作用。我们自己能够知道`Dog extends Animal`是否正确，然后直接选择`number`或者`string`!但是条件类型在泛型中会发挥强有力的作用。

例如，示例中的`createLabel`方法：

```typescript
interface IdLabel {
  id: number /* some feilds */
}
interface NameLable {
  name: string /* other fields */
}

function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLable(nameOrId: string | number): IdLabel | NameLabel
function createLable(nameOrId: string | number): IdLabel | NameLabel {
  throw 'unimplemented'
}

type NameOrIdLable<T extends string | number> = T extends string ? NameLabel : IdLabel
function createLabel<T extends string | number>(nameOrId: T): NameOrIdLabel<T> {
  throw 'unimplemented'
}

let a = createLabel('typescript') // a: NameLabel
let b = createLabel(2.8) // b: IdLabel
let c = createLabel(Math.random() ? 'hello' : 42) // c: NameLabel : IdLabel
```

使用条件类型来约束类型

```typescript
// 限制了泛型T必须具有message属性
type MessageOf<T extends { message: unknown }> = T['message']

interface Email {
  message: string
}

type EmailMessageContents = MessageOf<Email> // type EmailMessageContents = string

// T可以是任意类型，当没有message属性时，返回never
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

type DogMessageContents = MessageOf<Dog> // type DogMessageContents = never

// another example
type Flatten<T> = T extends any[] ? T[number] : T
```

### 条件类型中的**infer**

我理解`infer`代表推断出了一个泛型，这个类型根据后续使用确定，然后我们拿到这个类型，配合条件类型，在某种条件下，返回`infer`推断出的类型。

```typescript
// infer Item是个泛型，由将来的数组类型确定
// 如果Type是数组，就返回数组类型，否则返回Type类型
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

// infer Return是个泛型，由输入的函数的返回值确定
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never
```

## 分发条件类型

当泛型是个联合类型的时候，条件类型会被分发(Distributive)。比如：

```typescript
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number> // type StrArrOrNumArr = string[] | number[]

// 发生了什么？
// 当泛型接收了联合类型string | number
// 联合类型会被分别判断
type StrArrOrNumArr =
  | (string extends any ? string[] : never)
  | (number extends any ? number[] : never)

// 然后去掉条件
type StrArrOrNumArr = string[] | number[]

// 那如果需要(string | number)[]类型怎么办，可以这么搞
// 将extends前后的关键字都用方括号包裹住
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never // type StrArrOrNumArr = (string | number)[]
```

## Mapped Types

> docs: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

映射类型。

todo: 后续的还需要认真看，主要看起来是由原对象的 key 生成新的一组 key。

## Template Literal Types

> docs: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html

模板文本类型。这个有点类似字符串模板的 type 版。

```typescript
type World = "world";
type Greeting = `hello ${World}`; // type Greeting = "hello world"

// Union 类型会被依次处理。
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

这个看着还挺有意思。

```typescript
type PropEventSource<Type> = {
    // 这里可以限制on里接收的字符串只能是`${key}Changed`
    // 这里string & keyof Type限制了只有string类型的key
    on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
    firstName: 'Saoirse',
    lastName: 'Ronan',
    age: 26,
});

// str和num都可以自动推断出来
person.on('firstNameChanged', (str) => {})
person.on('firstNameChanged', (num) => {})
```

**内置的`string`类型的操作类型**

`Uppercase<StringType>` 字母转大写

```typescript
type Greeting = 'Hello, world'
type ShoutyGreeting = Uppercase<Greeting> // type ShoutyGreeting = "HELLO, WORLD"
```

`Lowercase<StringType>` 字母转小写

```typescript
type Greeting = 'HELLO, WORLD'
type ShoutyGreeting = Lowercase<Greeting> // type ShoutyGreeting = "Hello, world"
```

`Capitalize<StringType>` 首字母转大写

```typescript
type Greeting = 'hello, world'
type ShoutyGreeting = Capitalize<Greeting> // type ShoutyGreeting = "Hello, world"
```

`Uncapitalize<StringType>` 首字母转小写

```typescript
type Greeting = 'HELLO, WORLD'
type ShoutyGreeting = Uncapitalize<Greeting> // type ShoutyGreeting = "hELLO, WORLD"
```

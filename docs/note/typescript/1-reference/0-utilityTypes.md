# Utility Types 实用类型

> docs: https://www.typescriptlang.org/docs/handbook/utility-types.html

## `Readonly<Type>`

把类型中的所有属性的类型都改成`readonly`，这个类型主要用来标记禁用运行时赋值。

```typescript
function freeze<Type>(obj: Type): Readonly<Type>
```

## `Extract<Type, Union>`

从联合类型中，提取需要的类型来构造一个新类型。

```typescript
// type T0 = 'a'
// 第二个参数的联合类型无需在第一个参数中全包括，如'f'，可以是前面没有的
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
// type T1 = () => void
type T1 = Extract<string | number | (() => void), Function>
```

## `NonNullable<Type>`

剔除 Type 中的`null`和`undefined`，来构造一个新类型。

```typescript
// type T0 = string | number
type T0 = NonNullable<string | number | undefined>
```

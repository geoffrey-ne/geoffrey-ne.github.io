# Utility Types 实用类型

> docs: https://www.typescriptlang.org/docs/handbook/utility-types.html

## `Extract<Type, Union>`

从联合类型中，提取需要的类型来构造一个新类型。

```typescript
// type T0 = 'a'
// 第二个参数的联合类型无需在第一个参数中全包括，如'f'，可以是前面没有的
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
// type T1 = () => void
type T1 = Extract<string | number | (() => void), Function>
```

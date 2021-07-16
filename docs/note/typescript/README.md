# typescript 学习

核心作用：

- 静态类型系统：js 本身具有的类型，比如：`string`、`string[]`等；使用`interface`自定义的复杂类型

## 基本语法

类型注解方式：`:TypeAnnotation`

```typescript
const num: number = 123
```

都有哪些类型：

基础类型：

- 原始类型：`string`、`number`、`boolean`；
- 数组：`string[]`；
- 接口：`interface Name { first: string; second: string }`；可以使用内联语法注释内容：`:{ /*Structure*/ }`
- 特殊类型：
  - `any`：能够兼容所有类型，包括 `any` 本身，它会关闭 ts 检查，慎用；
  - `null`和`undefined`：`null`和`undefined`字面量可以赋值给任意类型变量；
  - `void`：仅用来表示函数没有返回值。

复合类型：

- 联合类型：`|`标记属性为多种类型之一，例如：`const strOrNum: string | number`；
- 交叉类型：`&`标记属性具有两种类型的所有功能。例如：`function extend<T extends object, U extends object>(first: T, second: U): T & U { }`；

类型别名 —— `type`

`type SomeName = someValidTypeAnnotation`

```typescript
type Text = string | { text: string }
type Coordinates = [number, number]
type Callback = (data: string) => void
```

## keyof

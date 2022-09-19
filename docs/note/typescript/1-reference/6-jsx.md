# JSX

> docs: https://www.typescriptlang.org/docs/handbook/jsx.html

## Intrinsic elements

内部元素，可以使用`JSX.IntrinsicElements`进行 jsx 元素定义，如果没有定义这个接口，所有内部元素都不会进行类型检查。但是如果定义了，所有内部元素的都会作为`JSX.IntrinsicElements`接口的属性进行检查：

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    foo: any
    // 可以定义一个catch-all string，来防止其它需要声明的标签报错
    // [elemName: string]: any;
  }
}
;<foo /> // ok
;<bar /> // error
```

types/react 类型实现了这个接口，所以你可以通过这个接口查找内部元素类型定义：

```typescript
JSX.IntrinsicElements['img'] // typeof img attributes
```

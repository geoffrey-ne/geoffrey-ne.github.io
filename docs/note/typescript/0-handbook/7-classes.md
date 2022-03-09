# Classes 类

> docs: https://www.typescriptlang.org/docs/handbook/2/classes.html

## Fields

fields，用来声明公有的(public)且可修改的成员变量。

如果配置了`--strictPropertyInitialization`，那么 field 定义的成员变量必须初始化，而且必须在构造函数中初始化，而不是调用成员函数初始化。

```typescript
class Point {
  x: number
  y: number
  // use fields to initialize
  z = 0

  name: string
  // still error: Property 'incorrect' has no initializer and is not definitely assigned in the constructor.
  incorrect: string
  // 加感叹号后就不用必须初始化了
  noneedInit!: string

  constructor() {
    this.name = 'hello'
    // 不能用方法初始化，ts不认，因为子类有可能覆盖此方法
    this.initInMethods()
  }

  initInMethods() {
    this.incorrect = 'something'
  }
}

const pt = new Point()
pt.x = 0
pt.y = 0
```

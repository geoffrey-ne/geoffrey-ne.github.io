---
title: TypeScript - 声明文件
subtitle: 学习笔记
author: wangyunfei
date: 2019-11-03
tags: [fe, TypeScript]
---

# TypeScript - 声明文件

## 1 声明语句

```typescript
// 比如jQuery，ts编译器并不知道$ 或 jQuery是什么
declare var jQuery: (selector: string) => any

jQuery('#foo')
```

使用`declare var`可以定义全局变量`jQuery`的类型，并没有真的定义一个变量。仅仅用于编译时的检查，在编译结果中会被删除。

## 2 声明文件

我们通常会把声明语句放到一个单独的文件中。比如：

```typescript
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any

// src/index.ts

jQuery('#foo')
```

声明文件必须以`.d.ts`为后缀。假如无法解析声明文件，则需要检查`tsconfig.json`中的`files`、`include`、`exclude`配置，确保其包含了`.d.ts`的配置文件

#### 第三方声明文件

推荐使用`@types`统一管理第三方库的声明文件。
比如：

```bash
npm install @types/jquery --save-dev
```

可以在[这个页面](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

## 3 书写声明文件

### 3.1 全局变量

全局变量的声明文件，如果是以`npm i @types/xxx --save-dev`安装的，则不需要任何配置。如果将声明文件直接放在当前项目，则建议和其他源码一起放到 src 目录下：

```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

#### declare var

`declare var` 和 `declare let` 没有什么区别，它们定义的变量允许被修改。

一般来说，全局变量都是进制修改的常量，所以大多数情况都是用`const`。

```typescript
// src/jQuery.d.ts

declare const jQuery: (selector: string) => any

jQuery('#foo')
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQuery = function(selector) {
  return document.querySelector(selector)
}
// ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
```

需要注意，声明语句只能定义类型，切勿在声明语句中定义具体的实现。

#### declare function

用来定义全局函数类型。支持声明函数重载。

```typescript
// src/jQuery.d.ts

declare function jQuery(selector: string): any
declare function jQuery(domReadyCallback: () => any): any

// src/index.ts

jQuery('#foo')
jQuery(function() {
  alert('Dom Ready!')
})
```

#### declare class

用来定义一个类类型。

```typescript
// src/Animal.d.ts

declare class Animal {
  name: string
  constructor(name: string)
  sayHi(): string
}

// src/index.ts

let cat = new Animal('Tom')
```

#### declare enum

用来定义一个枚举类型。

```typescript
// src/Directions.d.ts

declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

// src/index.ts

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

// 编译后
var directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
] // 其中 Directions是由第三方库定义好的全局变量。
```

#### declare namespace

用来表示全局变量是一个对象，包含很多子属性。`declare namespace`内部，我们可以直接使用`function`来声明函数，而无需使用`declare function`。`const`、`class`、`enum`等也是一样。

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  function ajax(url: string, settings?: any): void
  const version: number
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick,
  }
}

// src/index.ts

jQuery.ajax('/api/get_something')
console.log(jQuery.version)
const e = new jQuery.Event()
e.blur(jQuery.EventType.CustomClick)

jQuery.ajax('/api/get_something')
```

##### 嵌套的命名空间

如果对象拥有更深的层级，可以嵌套 namespace。

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  function ajax(url: string, settings?: any): void
  namespace fn {
    function extend(object: any): void
  }
}
```

如果仅有`fn`一个属性，则可以不使用嵌套

```typescript
// src/jQuery.d.ts

declare namespace jQuery.fn {
  function extend(object: any): void
}
```

#### interface 和 type

interface 和 type 不需要再使用`declare`修饰

```typescript
// src/jQuery.d.ts

interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any
}
declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts

let settings: AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo',
  },
}
jQuery.ajax('/api/post_something', settings)
```

暴露再最外层的`interface`和`type`会作为全局类型作用于整个项目中，我们最好将他们放到`namespace`下。

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
  }
  function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts

let settings: jQuery.AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo',
  },
}
jQuery.ajax('/api/post_something', settings)
```

#### 声明合并

假如 jQuery 既是一个函数，又是一个对象。我们可以组合多个声明语句，它们会不冲突的合并。

```typescript
// src/jQuery.d.ts

declare function jQuery(selector: string): any
declare namespace jQuery {
  function ajax(url: string, settings?: any): void
}

// src/index.ts

jQuery('#foo')
jQuery.ajax('/api/get_something')
```

### 3.2 npm 包

一般来说，npm 包的声明文件可能存在两个位置：

- `package.json`中的`types`字段或者`index.d.ts`声明文件；
- 发布到`@types`里的。

#### export

在 npm 包声明文件中，使用`declare`不再会声明一个全局变量，只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。

```typescript
// types/foo/index.d.ts

declare const name: string
declare function getName(): string
declare class Animal {
  constructor(name: string)
  sayHi(): string
}
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}
interface Options {
  data: any
}

export { name, getName, Animal, Directions, Options }

// src/index.ts

import { name, getName, Animal, Directions, Options } from 'foo'

console.log(name)
let myName = getName()
let cat = new Animal('Tom')
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]
let options: Options = {
  data: {
    name: 'foo',
  },
}
```

##### export default

```typescript
// types/foo/index.d.ts

export default function foo(): string

// src/index.ts

import foo from 'foo'

foo()
```

注意，只有`function`、`class`、`interface`可以直接导出，其他变量需要先定义出来。

```typescript
// types/foo/index.d.ts

export default Directions

declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}
```

##### export =

对于使用 commonjs 规范的库，假如要为它写类型生命观文件的话，就需要使用到`export =`这种语法。

```typescript
// types/foo/index.d.ts

export = foo

declare function foo(): string
declare namespace foo {
  const bar: number
}
```

使用`export =`后就不能再使用单个导出了`export { bar }`。

### 3.3 UMD 库

既可以通过`<script>`标签引入，又可以通过`import`导入的库，称为 UMD 库。相比 npm 包，我们需要额外声明一个全局变量。

ts 提供了`export as namespace`语法支持。使用这种语法可以将已经声明好的一个变量声明为全局变量。

```typescript
// types/foo/index.d.ts

export as namespace foo
export = foo

declare function foo(): string
declare namespace foo {
  const bar: number
}

// 或者与export default 一起使用

// types/foo/index.d.ts

export as namespace foo
export default foo

declare function foo(): string
declare namespace foo {
  const bar: number
}
```

### 3.4 直接扩展全局变量

ts 的声明合并，直接支持了扩展全局变量。

```typescript
// 扩展String
interface String {
  prependHello(): string
}

'foo'.prependHello()

// 扩展namespace

// types/jquery-plugin/index.d.ts

declare namespace JQuery {
  interface CustomOptions {
    bar: string
  }
}

interface JQueryStatic {
  foo(options: JQuery.CustomOptions): string
}

// src/index.ts

jQuery.foo({
  bar: '',
})
```

### 3.5 在 npm 包或 UMD 库中扩展全局变量

使用`declare global`

```typescript
// types/foo/index.d.ts

declare global {
  interface String {
    prependHello(): string
  }
}

export {}

// src/index.ts

'bar'.prependHello()
```

### 3.6 模块插件

在改变原有模块的结构时，可以使用 `declare module` 来扩展原有模块的类型。

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块。

```typescript
// types/moment-plugin/index.d.ts

import * as moment from 'moment'

declare module 'moment' {
  export function foo(): moment.CalendarKey
}

// src/index.ts

import * as moment from 'moment'
import 'moment-plugin'

moment.foo()
```

## 4 声明文件的依赖

可以直接使用`import`来导入另一个声明文件。另外一种方法，是使用三斜线指令。只有以下场景适合使用三斜线：

- 书写全局变量的声明文件；
- 依赖一个全局变量时；
- 拆分声明文件时。

### 4.1 书写一个全局变量的声明文件

在全局变量的声明文件中，不允许出翔`import`、`export`关键字。所以需要三斜线替代。

```typescript
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string
```

### 4.2 依赖一个全局变量的声明文件

全局变量不支持通过`import`导入。

```typescript
// types/node-plugin/index.d.ts

/// <reference types="node" />

export function foo(p: NodeJS.Process): string
```

### 4.3 拆分声明文件

```typescript
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery
```

其中 `types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。

## 5 自动生成声明文件

如果源码使用 ts 书写的，那么可以通过`declaration`选项，配置同时生成`.d.ts`声明文件。

```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

## 6 发布声明文件

- 将声明文件和源码放在一起；
- 将声明文件发布到 `@types` 下。

如果声明文件是通过`tsc`自动是生成的，那么无需任何配置，只需要把编译好的文件也发布到 npm 上即可，使用方就可以获取到类型提示了。

如果是手写的声明文件，那么需要满足一下条件之一，才能被识别：

- 给`package.json`中的`types`或`typing`字段指定一个类型声明文件的地址；
- 在项目根目录下，编写一个`index.d.ts`文件；
- 针对入口文件（`package.json`中的`main`字段指定的入口文件），编写一个同名，不同后缀的`.d.ts`文件。

### 将声明文件发布到@types 下

如果我们是在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request，那么就需要将声明文件发布到 `@types` 下。

详情参见：[DefinitelyTyped - Create a new package](https://github.com/DefinitelyTyped/DefinitelyTyped#create-a-new-package)。

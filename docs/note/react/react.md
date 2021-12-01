# react

- [react 官网](https://reactjs.org/)
- [react 中文](https://zh-hans.reactjs.org/)

## JSX

js 语言的扩充，用来描述 react 的 UI 组件。JSX 在渲染内容前，默认会进行转义，防止[XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

```jsx
const element = <h1>Hello, world!</h1>
```

可以使用大括号嵌入任意 js 表达式。

```jsx
const name = 'wyf'
const element = <h1>Hello, {name}!</h1>
```

jsx 本身也是表达式，可以出现在表达式可以出现的任意位置，比如赋值，函数返回等。

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}
```

这是因为 jsx 实际会被 babel 编译成`React.createElement()`函数的调用，并返回一个对象。

```jsx
const element = <h1 className="greeting">Hello, world!</h1>
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!')
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  },
}
```

jsx 中的 html 元素同样可以声明属性，但属性名需转化为驼峰写法，这是因为 jsx 比起 html 更像 js。

```jsx
const element = <div tabIndex="0" className="test"></div>
```

jsx 指定子元素

```jsx
// 空元素可以直接使用 /> 闭合
const element = <img src={user.avatarUrl} />
// 其它子元素可以正常嵌套
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
)
```

## 元素渲染

元素是构成 react app 的最小组成部分，组件由元素构成。

与 dom 的元素不同，react 元素只是一个对象，开销小。由 react dom 确保其与 dom 一致。

`ReactDOM.render`方法用来将 react 元素渲染到一个根节点中。

```jsx
const element = <h1>Hello, world</h1>
ReactDOM.render(element, document.getElementById('root'))
```

react 元素是不可变对象。一旦被创建，你就无法更改他的子元素或者属性。元素像电影的一帧，代表了某个时刻的 UI。

```jsx
// 你可以通过多次调用ReactDOM.render来更新dom元素
// 但在实践中，一般仅使用一次ReactDOM.render，而将这种变化封装在有状态的组件中
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

react 只更新实际需要更新的部分（虚拟 dom）。

## 组件和 Porps

组件，可以理解为 js 函数，接受入参（props），并返回 React 元素。组件可以分为函数组件与 class 组件。组件命名一定使用大写字母，小写字母开头会被认为是 html 元素。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'))
```

你可以通过提取通用组件 + 组合组件搭建起你的 app。

我们需要保证 Props 的只读性，像一个纯函数那样使用组件。

## 状态和生命周期

我们之前理解的组件是由元素组装出来的，通过传入不同的 props 控制组件不同展示形态。这样的组件被称为无状态组件，组件的一切都是由 props 及组件定义决定的。

但是有时候我们希望数据维护逻辑也封装在组件内部，由组件自己维护，当这个组件从页面中移除时，数据也随着组件一起被销毁。这样的组件称之为有状态的组件。而维护状态的创建与销毁就会涉及到生命周期。

```jsx
class Clock extends React.Component {
  constructor(props) {
    // class类型的组件必须调用super(props)
    super(props)
    this.state = { date: new Date() }
  }
  // 声明周期，mount之后会执行
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  // 销毁时会执行
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

- state 的更新会触发 ui 更新，更新 state 需要使用`setState`方法；
- state 的更新可能是异步的，多个 setState 可能合并；
- setState 更新时，会将传入的对象和当前 state 进行一次合并。

### 单向数据流

一个组件的 props 可能来自祖先组件的 state 或者 props，想象数据（或状态）像一个瀑布，每一个组件的状态是瀑布水源之一，但是都是单向的向下流动。

## 事件处理

react 中绑定事件处理与 dom 元素处理非常类似，区别在于：

- react 绑定事件使用驼峰写法，比如：`<button onclick="activateLasers()>`，react 中：`<button onClick={activateLasers}`；
- react 事件直接使用 jsx 传递函数表达式；
- react 事件中不能直接使用`return false`来阻止默认事件，需要显式调用`e.preventDefault()`；
- react 中的`event`为自定义的对象，不是原生的事件对象，所以无需担心兼容性问题；
- 如果 event handler 需要其它参数时，可以直接绑定`<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`；

## 条件渲染

主要是使用条件语句，比如`if else &&`等等控制组件的渲染。

## lists and keys

这篇倒是没说太多主要知识点：

- 使用 map 返回 jsx 来渲染列表；
- map 循环中的返回的最外层组件应该被`key`标识；
- key 需要列表内局部唯一，不需要全局唯一；
- map 语句可以直接在 jsx 中使用。

至于为什么需要用 key 给了一篇文章：[in-depth explanation about why keys are necessary](https://reactjs.org/docs/reconciliation.html#recursing-on-children)；

为什么不能用数组 index 作为 key 给了一篇文章：[in-depth explanation on the negative impacts of using an index as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)

## Forms 表单

原来 Forms 中讲了受控组件。一般对于原生 html 标签，比如`<input> <textarea> <select>`，他们都自己维护自己的状态（数据），并且通过用户的操作更新值。而在 react 中，状态通常由 react 组件维护，并且只能通过`setState()`方法更新。

我们可以将两者结合起来，来统一数据至一个单一的源。像这种 form 中的 input 组件值由 react 控制的组件，叫做受控组件。受控的方式通常是使用 state 赋值给组件 value，然后通过监听其 change 方法（这个 onChange 真的好像指令，猜测 vue 的指令就这么来的）。

## 状态提升

就是把 state 提升到公共祖先那，实现数据状态共享。

## 组合 vs 继承

react 组件更加适合使用组合方式，而不是继承。组合可以使用`children`或者`props`拼出一个新组件。

## react 的一些思考

从 UI 到 react 工程的一些思路。

# advance guides

## Accessibility

todo

## Code-splitting

### Bundling

打包工具，react 程序一般都会使用 webpack/rollup/browserify 等等打包工具打包。如果使用 create react app,nextjs,gatsby，这些创建项目，那么打包工具已经帮你集成好了。否则你需要自己配置打包工具。

### code splitting 代码分割

打包很好，但是把所有文件都打到一起可能产生一个非常大的包，尤其是使用第三方工具的时候，你需要关注打包结果文件，以免它过大导致程序加载缓慢。

打包工具一般都支持代码分割，这支持程序在运行时动态加载需要的资源，或者减少首次渲染需要的代码。

**import**

最好的标记代码分割方式是使用`import`语法，打包工具如`webpack`会根据`import`自动完成代码分割。当使用`babel`时，需要使用`@babel/plugin-syntax-dynamic-import`插件，保证能够识别`import`却不转变他们。

**React.lazy 及 Suspense**

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}
```

使用`React.lazy`可以实现组件的动态加载。懒加载组件应该再`Suspense`内部使用，这允许我们对错误进行处理。

路由方式的代码分割本质也是使用`React.lazy`。

`React.lazy`要求 import 的组件使用默认导出`default exports`，如果你使用了具名导出，可以使用`as default`方式兼容。

```jsx
export { MyComponent as default } from './ManyComponents.js'
```

## 上下文 context

上下文允许子孙组件直接获取祖先的数据，无需逐层传递。

如果仅仅是为了避免多层数据传递，组件组合往往是一个更好的解决方案。将需要数据的组件提到数据所在的父组件，然后将组件本身传下去。（但是我感觉这样看着也很难受）

### API

createContext

`const MyContext = React.createContext(defaultValue);`，创建一个 context 对象。注意：默认值仅在组件未找到匹配的`Provider`时才会生效。

`Class.contextType`给类组件使用上下文用的。

`Context.Consumer`给函数组件使用上下文用的。

`Context.displayName`仅仅是给 devtool 查看使用的。

这篇里有个`Caveats`注意，主要是说在给 provider 的 value 赋值时，不用直接使用对象字面量，`<MyContext.Provider value={{something: 'something'}}>`。因为每次 provider 重新渲染时，都会触发所有消费者更新。应该使用 state 来替换字面量。

## Error Boundaries

错误边界，其作用类似 try cache，只不过其形式为组件。一个`ErrorBoundary`组件下的所有子节点中出现任何问题，都可以被其捕获并进行处理，你可以用它提供 fallback，以优化展示，而不是全局页面崩溃。

`ErrorBoundary`组件只能是类组件，其中`static getDerivedStateFromError(error)`方法可以提供 fallback 处理，`componentDidCatch`可以用于记录日志。

## Forwarding Refs

转交 refs？看了前半部分，理解上是可以在父组件上创建 ref，然后在子组件上绑定 ref，达到外层可以访问内部 ref 的能力。目前暂时没遇到场景，没细看。

```tsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))

// You can now get a ref directly to the DOM button:
const ref = React.createRef()

<FancyButton ref={ref}>Click me!</FancyButton>
```

## Fragments

一个空的标签，允许包裹多个 child 元素。这里面有个问题，就是为什么 react 的组件和元素都只能有一个根节点？是不是因为 jsx 限制的，在编译的时候变成了 React.createElement 方法。**存疑**

```tsx
// <React.Fragment>
<>
  <Child1 />
  <Child2 />
  <Child3 />
</>
```

## 参考资料

- [一步步构建自己的 react](https://pomb.us/build-your-own-react/)
- [React 技术揭秘](https://react.iamkasong.com/)

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

## 参考资料

- [一步步构建自己的 react](https://pomb.us/build-your-own-react/)
- [React 技术揭秘](https://react.iamkasong.com/)

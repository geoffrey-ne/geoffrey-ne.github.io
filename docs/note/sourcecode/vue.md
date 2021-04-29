# vue 源码阅读笔记

## 声明 Vue 类

顺序：

- src/platforms/web/entry-runtime-with-compiler.js - 具备 compiler
- src/platforms/web/runtime/index.js - 绑定与平台相关的特性
- src/core/index.js - 绑定核心方法

这三个步骤绑定了 vue 的核心方法 + vue 根据不同平台所具有的特性。如果仅为 runtime 到上一个文件就够了，这个文件还包括将 template 转换为 render 方法的 compliler 部分。

### src/core/index.js

#### 声明 Vue，向原型上绑定一些全局方法

初始化`function Vue (options) {}`后，开始向`Vue`的原型上绑定方法。

- initMixin：初始化方法`_init`；
- stateMixin：数据相关`$data`、`$props`、`$set`、`$delete`、`$watch`；
- eventsMixin：事件相关`$on`、`$once`、`$once`、`$off`；
- lifecycleMixin：生命周期相关`_update`、`$forceUpdate`、`$destroy`；
- renderMixin：render 相关：`nextTick`、`_render`；

#### initGlobalAPI，向 Vue 本身添加一些属性和方法

- `Vue.util`、`set`、`delete`、`nextTick`、`observable`、`options`、`use`、`mixin`、`extends`、asset 相关方法

#### $isServer & $ssrContext & FunctionalRenderContext & version

全局标记

### src/platforms/web/runtime/index.js

core/index.js 核心方法绑定完之后，开始根据平台绑定不同方法。

- Vue.config: `mustUseProp`、`isReservedTag`、`isReservedAttr`、`getTagNamespace`、`isUnknownElement`;
- 扩展`directives`，增加平台特有的`platformDirectives`；
- 扩展`components`，增加平台特有的`platformComponents`；
- 增加`__patch__` 和 `$mounted`方法；
- 如果是浏览器环境，还会检查`devtools`。

### src/platforms/web/entry-runtime-with-compiler.js

然后用户就要使用这个 VUE 类啦

## 初始化 new Vue

### init（`this._init(options)`）

入口：src/core/instance/index.js

#### merge options（初始化 & 合理化 options）

处理传入的 Options，和父级、extends、mixin 的 options 做合并。

正常合并调用`mergeOptions(parent: 父组件的options, child: 当前options, vm)`（`vm._isComponent` 为选项为 true 的被特殊处理）

mergeOptions，合并 parent 和 child 的配置：

- 1. 先检验`components`选项命名，不满足时 warning
  - 满足 html5 规范；
  - 非内置标签（slot,component）、非 html 标签、非 svg 标签
- 2. 当前 child 为函数时，child = child.options
- 3. normalize
  - normalizeProps: 处理 props
    - 将所有非 Object-based 的 props 都转换为 object
    - 命名全部保存为驼峰写法
    - 支持格式：字符串数组；对象，值可以是对象也可以是 type 的值
    - 否则 warning
    - 替换 props 为新值 options.props = res
  - normalizeInject: 把所有 inject 改为 object 形式
  - normalizeDirectives: 直接定义为 function 的指令格式化为 object 形式
- 4. extends 和 mixin 的选项都递归合并到 parent 上
- 5. 按照合并策略进行合并
  - 默认合并策略：当前有配置就用当前的，没有就用 parent 的
  - 生命周期
    - 调用 mergeHook 合并为数组： parent 的 hook 在数组前面，child 的 hook 放在后面(parentVal.concat(childVal))
    - 有数组去重操作
  - `['component', 'directive', 'filter']`被归为 assets，使用 mergeAssets 合并
  - `props、methods、inject、computed`统一合并策略
  - `watch`单独合并策略

#### init（initLifecycle、initEvents、initRender）

initProxy

没看

initLifecycle

处理生命周期。

- 配置父子关系相关的变量
  - 先找到第一个非抽象的父节点，并添加示例到父节点的 children 中。`parent.$children.push(vm)`；
  - 配置实例的父节点。`vm.$parent = parent`
  - 配置 root；
- 配置了一堆跟生命周期相关的变量；

initEvents

- 初始化`_events`为空对象
- `_hasHookEvent`配置为 false
- `_parentListeners` 不知道干嘛的

initRender

- 初始化`_vnode`，作为虚拟 dom 的根节点
- 其他的没看明白

#### callHook(vm, 'beforeCreate')

所以 beforeCreate 触发的时候，只做了处理 options 和 init 的操作。

所以此时，还拿不到 props | methods | data | computed | watch 这些

#### initInjections | initProvide

处理 data/props 前，处理 inject;

处理 data/props 后，处理 provide。

#### initState（props | methods | data | computed | watch）

处理 props | methods | data | computed | watch。

- props：defineReactive
- methods：合理的 methods 绑到 vm 实例上
- data：调用 data 方法拿到 data，并绑到 vm 上。observe data 本身
- computed：先初始化 data 再初始化 computed。使用 defineProperty 将 computed 对应的 key 绑到 vm 上
  - !isServerRendering 的 computed 属性都有缓存，即为每一个 computed 都定义一个 Watcher；
  - 缓存就是指使用了 watcher，只有 watcher 为 dirty 时才会主动更新
- watch：使用 vm.\$watch 创建监听

computed 和 watch 底层都是使用了`Watch`，不同的是：

- computed 在监听的数据更新时，更新了 watch 的 dirty 为 true，在调用 getter 时更新数据，并通知监听者
- watch 主要在监听数据更新时，执行操作方法，方法可以获取到 oldVal,newVal

#### callHook(vm, 'created')

所以 created 已经可以拿到数据和方法（props | methods | data | computed | watch）了。但是还拿不到`$el`。

### mounted （`vm.$mount(vm.$options.el)`）

如果配置了`vm.$options.el`，则执行 mount（`mountComponent`）。

- 入口：src/core/instance/lifecycle.js

#### callHook(vm, 'beforeMount')

beforeMount 较于 created 仅仅做了一个绑定\$el(`vm.$el = el`)，和 render 校验。

mountComponent 核心就是调用了比较熟知的`patch`方法。具体详见 patch 说明

patch 会递归创建子节点，子节点创建成功后(vnode 不为空)，会触发`callHook(vm, 'mounted')`，然后继续创建父节点，所以父节点的 mounted 要晚于子节点，顺序为：

- 父组件 beforeCreated 父组件 created 父组件 beforeMounted （此时父组件的 patch 会触发创建子组件）
- 子组件 beforeCreated 子组件 created 子组件 beforeMounted
- 子组件 mounted -> 父组件 mounted(所有子组件均 mounted 之后)

## （内部）双向绑定说明

在组件 mount 之前，会调用新建一个 watcher，watcher 执行 get 时，配置了`Dep.target = this`（当前 watcher），而后调用`updateComponent`，触发 render，render 在获取数据值时，触发了数据的 get 方法收集依赖。

所以当数据改变时，会重新触发`updateComponent`，调用`render`更新 vnode，调用`__patch__`做 diff 后更新视图。

## （内部）patch 说明

```
vm._init()
|_ vm._mount()
  |_ vm._update(vm._render(), hydrating)
    |_ vm.__patch__
```

- `_render`通过调用`createElement`创建了 vnode 树
- `_update`方法拿到 vnode 树，调用 patch 开始更新 DOM

## 其他细节

### nextTick

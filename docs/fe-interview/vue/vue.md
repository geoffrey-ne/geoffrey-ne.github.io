# vue

https://github.com/sudheerj/vuejs-interview-questions

## 1. data 为什么需要函数

组件是可复用的，组件内的数据应该是相互隔离互不影响的。

## 2. v-for 和 v-if 为什么不建议一起使用

v-for 优先级高于 v-if，会对数组中每一项进行判断，如果内容很多但展示的很少的话，会很浪费性能。推荐使用 computed 先过滤。

## 3. watch 与 computed 的区别

细节上：computed 会缓存 getter，只有在依赖数据变化时更新；watch 会传入 newVal 和 oldVal，适合做逻辑处理；使用上：computed 主要是在一个数据变化时更新另一个数据时使用；watch 主要是在一个数据变化时处理一些事情。

## 4. vue 生命周期及对应的行为

- beforecreated：\$el 和 data 并未初始化，不要修改 data，因为拿不到；
- created:完成了 data 数据的初始化， \$ el 没有 （初始化 data 的操作应该放在 created 而不是 beforeCreated）
- beforeMount：完成了 \$el 和 data 初始化，有了 render function 的时候才会执行
- mounted ：完成挂载

关于生命周期用法：

- beforecreate : 举个栗子：可以在这加个 loading 事件
- created ：在这结束 loading，还做一些初始化，实现函数自执行
- mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
- beforeDestroy： 你确认删除 XX 吗？ destroyed ：当前组件已被删除，清空相关内容

## 5. 父子组件生命周期顺序

父组件 beforeCreated 父组件 created 父组件 beforeMounted 子组件 beforeCreated 子组件 created 子组件 beforeMounted 子组件 mounted 父组件 mounted

子组件优于父组件先 mounted。

## 6. vue 组件间通讯方法

- 父子主要通过：props、emit
- 全局管理：eventBus，vuex
- 其他：provide / inject，$parent / $children

## 7. 如何实现自定义指令

钩子函数：

- bind：只调用一次，在第一次绑定元素时调用，初始化设置(el, binding)；
- inserted：插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)；
- update：vnode 更新时调用；
- componentUpdated：vnode 及子 vnode 都更新后调用；
- unbind：只调用一次，解绑时调用。

```javascript
Vue.directive('lazyload', {
  // 指令的定义
  bind: function(el, binding) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        let lazyImage = entry.target
        // 相交率，默认是相对于浏览器视窗
        if (entry.intersectionRatio > 0) {
          lazyImage.src = binding.value
          // 当前图片加载完之后需要去掉监听
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })
    lazyImageObserver.observe(el)
  },
})
```

bind: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。 inserted: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。 update: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 componentUpdated: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。 unbind: 只调用一次，指令与元素解绑时调用。

## 8. nextTick 实现原理

当数据更新了，在 dom 中渲染后，自动执行该函数。使用 nextTick 保证当前视图渲染完成。

- 调用 nextTick 时，会把方法存入数组中 callbacks；
- 判断是否 pending（等待执行）中，否 -> 执行 timeFunc -> 使用 timeFunc 异步执行 callbacks 中的方法，执行结束之后清空数组，设置 pengding 为 false；
- timeFunc 用于判断用什么执行异步
  - 优先判断 promise；
  - 不支持 promise 的使用 MutationObserver(可以监控 DOM 变化，并且是异步更新)
  - 否则判断 setImmediate
  - 否则使用 setTimeout

## 9. vue3 为什么不用 defineProperty 了

defineProperty 缺点：

- 对于数组，不能通过数组下标来观测其变化，也不能观测数组长度 length 的变化；
- 不能检测对象属性的添加或删除；

proxy 可以完美解决以上问题，但是 proxy 自身也有问题：

- Proxy 代理的对象只能代理到第一层，多层需要递归监听；
- Proxy 代理对象是数组时，比如 push 操作会触发多次 get/set ，因为 push 操作除了增加数组的数据项之外，也会引发数组本身其他相关属性的改变，因此会多次触发 get/set；

解决方案：

- 判断 key 是否为新增属性，是就 trigger；
- 判断旧值与新值是否相等，是就 trigger;

## 10. vue diff

- 先找相同，左左，右右；
- 没有再找只需移动的，左右右左；
- 没有则根据新 key 在旧 key 表中查找，找到了并且相同，则移动到旧头前，否则新建；
- 最后如果旧的遍历完了，则新的全部新建；如果新的遍历完了，则旧的全删除；

## 11. try_files、proxy_pass、rewrite

- try_files 为依次尝试路径，一般最后接的是肯定能满足的，比如 index.html，配合 vue 必须先访问到 html 才能生效前端路由使用；
- proxy_pass 一般是把请求转发至代理响应，不改变浏览器 url；
- rewrite 根据正则替换路径，会改变 url 地址；

## new Vue 做了什么

## compose api 和 react hook 区别

- vue 的 setup 只执行一次，react hook 一般是写在函数式组件中，最终被转换为`React.createElement`，每次渲染都会执行
- React 严格限制 Hook 的执行顺序和禁止条件调用

## keep-alive

# vue-router

vue-router 本质是支持 spa 单页面应用，实现前端路由跳转。

## 1. vue-router 有几种模式

- hash 模式

在浏览器中符号“#”，#以及#后面的字符称之为 hash，用 window.location.hash 读取；

特点：hash 虽然在 URL 中，但不被包括在 HTTP 请求中；用来指导浏览器动作，对服务端安全无用，hash 不会重加载页面。

- history 模式

使用了 HTML5 的 pushState、replaceState 来对浏览器历史记录进行修改，使用 popState 事件监听状态变更。

特点：history 模式需后台对 url 支持，否则会出现 404。

- abstract 模式（todo）

支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 2. vue-router 有几种导航守卫

三个全局守卫

- router.beforeEach 全局前置守卫进入路由之前
- router.beforeResolve 全局解析守卫(2.5.0+) 在 beforeRouteEnter 调用之后调用
- router.afterEach 全局后置钩子 进入路由之后

一个路由独享守卫：beforeEnter

三个组件内守卫

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

## 3. exact 作用

exact 代表精准匹配，比如<router-link to="/" exact></router-link>只有当路径为“/”时才被激活，而不是包含匹配（比如“/user”时就不会匹配到“/”）。

## 3.

## 源码阅读

### install

install 的时候绑定$router及$route 属性，注册 RouterView 及 RouterLink 组件。

- RouterView 用于展示路由组件；
- RouterLink 用于跳转。

### RouterView 组件

#### name 属性

name 属性（默认值为 Default）可以支持同时展示多个 router-view，示例

```javascript
// define router
;<div>
  <router-view name="header" />
  <router-view />
</div>

// config
const routerConfig = {
  path: '/m/follow',
  // 分别对应不同的name
  components: {
    header: Header,
    default: () => import(/* webpackChunkName: "appf" */ 'page/Follow'),
  },
}
```

#### 嵌套命名路由

router-view 中的组件再次使用 router-view 可以实现嵌套，在定义路由配置的时候同时定义嵌套的组件即可。

```json
{
  "path": "/settings",
  // 你也可以在顶级路由就配置命名视图
  "component": UserSettings,
  "children": [
    {
      "path": "emails",
      "component": UserEmailsSubscriptions
    },
    {
      "path": "profile",
      "components": {
        "default": UserProfile,
        "helper": UserProfilePreview
      }
    }
  ]
}
```

### RouterLink

#### 命名路由

为 router-link 组件提供 name 属性实现命名，可续可以直接使用这个名字实现跳转。

路由标签被激活时，会添加激活类名，可通过“exact-active-class”属性配置

# vue-router

vue-router 本质是支持 spa 单页面应用，实现前端路由跳转。

## exact 作用

exact 代表精准匹配，比如<router-link to="/" exact></router-link>只有当路径为“/”时才被激活，而不是包含匹配（比如“/user”时就不会匹配到“/”）。

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
<div>
  <router-view name="header" />
  <router-view />
</div>;

// config
const routerConfig = {
  path: "/m/follow",
  // 分别对应不同的name
  components: {
    header: Header,
    default: () => import(/* webpackChunkName: "appf" */ "page/Follow"),
  },
};
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

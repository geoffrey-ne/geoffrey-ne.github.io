# chrome 插件开发

> docs: https://developer.chrome.com/docs/extensions/

manifest.json 插件的配置文件

```ts
const manifestJSON = {
  name: 'Getting Started Example', // 插件名称
  description: 'Build an Extension!', // 插件描述
  version: '1.0', // 版本号
  manifest_version: 3,
  background: {
    // 与background相关
    service_worker: 'background.js',
  },
  permissions: [
    // 声明允许使用
    'storage', // 声明允许使用storage
    'activeTab',
    'scripting',
  ],
  action: {
    default_popup: 'popup.html', // 插件弹层配置
    default_icon: {
      // 插件icon展示
      '16': '/images/get_started16.png',
      '32': '/images/get_started32.png',
      '48': '/images/get_started48.png',
      '128': '/images/get_started128.png',
    },
  },
  icons: {
    // 插件在应用列表中的icon展示
    '16': '/images/get_started16.png',
    '32': '/images/get_started32.png',
    '48': '/images/get_started48.png',
    '128': '/images/get_started128.png',
  },
  options_page: 'options.html', // 右击插件，点击选项，的那个弹出页面内容
}
```

background script
  - 主要用作事件监听及处理

user interface 用户界面

- popup: 点击插件的弹层，**popup 每次点开都会重新加载一次**；
- options: 右击插件 -> 选项，的那个页面；

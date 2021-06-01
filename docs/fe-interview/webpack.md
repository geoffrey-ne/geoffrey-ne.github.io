# webpack

## loader 和 plugin 有什么区别

- Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。
- Plugin 就是插件，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## 常见loader

- style-loader: 用于把css注入到js中
- css-loader: 解析css文件

参考文章：

- [「吐血整理」再来一打 Webpack 面试题](https://juejin.cn/post/6844904094281236487)
- [让你的Webpack起飞—考拉会员后台Webpack优化实战](https://zhuanlan.zhihu.com/p/42465502)

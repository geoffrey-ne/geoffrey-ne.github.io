# webpack

## 模块化

- CommonJS：使用`require`导入模块，常见于 node。示例：`const moduleA = require('./moduleA')`
- AMD：异步加载依赖模块，常见于浏览器。示例：`define('module', ['dep'], function(dep) {})`
- ES6：ECMA 提出的 JavaScript 模块化规范。示例：`import { readFile } from 'fs'`

## 打包工具的核心功能

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

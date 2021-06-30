# vite

- [官方文档](https://cn.vitejs.dev/)

## 现存什么问题，vite 如何解决？

问题：日常开发启动开发服务器耗时过长。

解决方案原理：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。

### 服务器启动优化原理

Vite 将应用中的模块分为**依赖**和**源码**两类。

- 依赖(Dependencies)：大多为在开发时不会变动的纯 javascript。使用 esbuild 构建依赖；
- 源码(Source code)：原生 ESM 方式服务源码；Vite 只需要在浏览器请求源码时进行转换并按需提供源码；

### 服务器更新优化原理（HMR）

- vite 的 HMR 基于原生 ESM，只需使已编辑的模块与其最近的 HMR 边界之间的链失效，使 HMR 快速更新，无论应用大小；
- 源码模块使用 304 进行协商缓存；依赖模块使用 cache-control 强缓存；

### 生产环境仍需打包

**嵌套导入**会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）；为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

为了处理开发服务器与构建的最佳输出和行为一致，vite 提供了 [构建优化](https://cn.vitejs.dev/guide/features.html#build-optimizations)的[构建命令](https://cn.vitejs.dev/guide/build.html)，开箱即用。

### 不使用 ESBuild 进行生产环境打包

主要是因为 ESBuild 针对构建应用的重要功能仍在开发中，特别是代码分隔和 CSS 处理方面。未来功能稳定，可能会使用 esbuild 作为生产构建器。

### 对比

todo

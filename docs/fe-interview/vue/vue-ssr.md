- 客户端是用户一对一关系，服务器是一对多关系，所以需要将入口改为工厂模式，每次渲染创建新的 vue 实例，避免数据共享；
- 服务器上的数据是无需响应式的；
- 服务器端只会调用 beforeCreate 和 created 两个生命周期；
- store 需要原先存在**INITIAL_STATE**中，客户端根据其值初始化 store；

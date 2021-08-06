# react-query 学习

## 查询`useQuery`

`useQuery` 帮你在基础请求上包一层，使得返回的数据包括：`isLoading`、`isError`、`isFetching`等表述当前请求状态的字段。你可以用这些状态控制视图呈现。

`useQuery`接受的第一个参数代表唯一键值，你可以使用这个唯一键值在整个程序中重新获取数据、缓存和共享查询。

## 参考资料

- [用 React Query 来管理数据请求](https://zhuanlan.zhihu.com/p/261146977)
- [React Query 中文文档](https://cangsdarm.github.io/react-query-web-i18n/)

## 源码学习部分

### core

#### query

- 可以设置`cacheTime`，以最大的为准；
- 页面失去焦点时暂停查询，恢复焦点后，完成所有查询；
- 断网时暂停查询，恢复焦点后，完成所有查询；
- 暂停状态的查询如果取消应该抛`CancelledError`异常；
- 如果不支持取消，应该正常执行；
- 如果支持取消，程序应该终止查询；
- 明确调用取消的程序应该终止查询；
- `loading`状态取消不应该报错；
- 取消的查询应该支持重发；
- 取消一个已经响应(resolved)的查询不应该有影响；
- 取消一个已经 rejected 的查询不应该有影响；
- 当查询处在`refetching`状态，之前的查询状态应该保留；
- 缓存时间为 0 时，取消订阅之后，在 cache 中查询该`key`应该为`undefined`；
- 取消订阅之后应该被回收；
- 只要有被订阅，就不应该回收；

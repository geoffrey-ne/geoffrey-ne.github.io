# 浏览器

## 1. web 缓存

### 浏览器缓存

- 内存缓存：最优先
- service-worker 缓存
- http 缓存
  - 强缓存：cache-control: no store（彻底重来）；no cache（交由服务器判断是否可以使用缓存，可以返回 304）；max-age（缓存时间）；public 及 private 用于控制代理服务器是否可以缓存
  - 协商缓存：If-None-Match 中的 ETag 判断是否相同； If-Modified-Since 判断是否过期

### Web Storage

Web Storage api 提供一个比 cookie 更直观的存储键/值对方式。存储容量在 5-10M 之间，只有高版本浏览器支持。

- sessionStorage: 为每个源维持独立的存储空间，整个会话过程均可用；
- localStorage: 关闭浏览器后仍然可用。
  - 特点：只读、没有过期时间、需要手动删除

### IndexDB

IndexDB 是一个运行在浏览器上的非关系型数据库。

### couchbase

属于服务端数据库缓存，h5 项目中使用 url 缓存。

参考资料：

- [一张图总结 web 缓存](https://segmentfault.com/a/1190000018120629)

## 2. 跨域问题

同源：协议、域名、端口三者都一致

## 3. 网络攻击

### 3.1 xss 攻击

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，危害数据安全。

为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

### 3.2 CSRF 跨站请求伪造

CSRF（Cross-site request forgery），跨站请求伪造

https://www.iqiyi.com/v_19rrz4m0vc.html?flashvars=videoIsFromQidan%3Ditemviewclkrec#vfrm=5-7-0-1

## 4. 浏览器事件机制

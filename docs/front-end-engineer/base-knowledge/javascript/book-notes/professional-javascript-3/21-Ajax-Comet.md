---
title: Javascript高级程序设计（第三版）
subtitle: Ajax与Comet学习笔记
author: wangyunfei
date: 2019-10-15
tags: [fe, javascript]
---

Ajax 将浏览器原生的通信能力提供给了开发人员，简化了实现同样操作的任务。Ajax 技术的核心是 XMLHttpRequest 对象（XHR）。

## 21.1 XMLHttpRequest 对象

IE7+以上浏览器原生支持 XHR 对象。IE7 之前具有三种不同版本的 XHR 对象，可以创建 createXHR 方法用于保证 xhr 对象的存在。

### 21.1.1 XHR 的用法

#### open 方法

```javascript
xhr.open('get', 'example.php', false)
```

open 方法接受三个参数：请求类型；请求 URL；是否异步发送请求的布尔值。

open 方法并不会真正发送请求，而只是启动一个请求以备发送。

#### send 方法

```javascript
xhr.open('get', 'example.php', false)
xhr.send(null)
```

send 方法用于真正的发送一个请求。

send 方法接受一个参数，作为请求主体发送的数据。如果不需要主体，则必须传入 null。

#### 处理响应

无论同步异步请求，响应数据会自动填充 XHR 对象的属性。属性包括：

- responseText: 响应主体被返回的文本；
- responseXML: 响应内容类型是"text/xml"或"application/xml"，这个属性保存响应数据的 XML DOM 文档；
- status: 响应的 HTTP 状态；
- statusText: HTTP 状态说明。

可以通过检测状态来决定下一步操作：

```javascript
xhr.open('get', 'example.php', false)
xhr.send(null)
// 同步发送，js会等待服务端返回才继续向下执行
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  alert(xhr.responseText)
} else {
  alert(`Request was unsuccessful: ${xhr.status}`)
}
```

#### 处理异步请求响应

XHR 对象具有 readyState 属性，用于表示请求|响应过程的当前活动阶段：

- 0：尚未调用 open；
- 1：启动，已经调用 open，但是没有调用 send；
- 2：发送，已经调用 send，但是没有收到响应；
- 3：接收，已经接收到部分响应数据；
- 4：完成，已经接收到所有响应数据，可以在客户端使用。

readyState 值的改变会触发 readystatechange 事件。

必须在调用 open 之前绑定 readystatechange 事件。

```javascript
var xhr = createXHR()
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      alert(xhr.responseText)
    } else {
      alert(`Request was unsuccessful: ${xhr.status}`)
    }
  }
}

xhr.open('get', 'example.txt', true)
xhr.send(null)
```

#### abort

在接收到响应之前可以调用 abort()方法来取消异步请求。

`xhr.abort();`

### 21.1.2 HTTP 头部信息

可以使用`setRequestHeader()`方法设置自定义的请求头部信息。

该方法必须在`open`调用之后，`send`调用之前调用。

```javascript
var xhr = createXHR()
xhr.open('get', 'example.txt', true)
xhr.setRequestHeader('MyHeader', 'MyValue')
xhr.send(null)
```

可以使用`getResonseHeader(key)`方法获取指定头部信息，或者通过`getAllResponseHeaders()`获取一个包含所有头部信息的长字符串。

```javascript
var myHeader = xhr.getResponseHeader('MyHeader')
var allHeaderString = xhr.getAllResponseHeaders()
```

### 21.1.3 GET 请求

GET 是最常见的请求，用于向服务器查询信息。

GET 请求查询字符串可以追加在 URL 末尾，但是必须使用`encodeURIComponent()`进行编码。

### 21.1.4 POST 请求

POST 请求用于向服务器发送应该被保存的数据。数据应该作为请求主体，通过 send 方法传给服务端。

```javascript
var xhr = createXHR()
xhr.open('post', 'postexample.php', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
var form = document.getElementById('user-info')
xhr.send(serialize(form))
```

其中 Content-Type 头部信息设置为`application/x-www-form-urlencoded`代表表单提交时的内容类型。

## 21.2 XMLHttpRequest 2 级

随着 XHR 的广泛接受，W3C 也着手制定其标准规范，并进一步发展。

### 21.2.1 FormData

`FormData`为序列化表单以及创建与表单格式相同的数据提供了便利。

使用`FormData`无需再明确的指定请求头部，XHR 对象能够配置适当的头部信息。

```javascript
// 添加key-value
var data = new FormData()
data.append('name', 'Nicholas')

// 或者使用已有的form表单初始化
var xhr = createXHR()
xhr.open('post', 'postexample.php', true)
var form = document.getElementById('user-info')
xhr.send(new FormData(form))
```

### 21.2.2 timeout

IE8 增加了 timeout 属性，及其相应的处理函数。

timeout 时间内如果没有相应，请求就会自动终止，并触发 ontimeout 处理程序。此时如果 readyState 变为 4 调用 onreadystatechange 事件，再访问 status 属性会报错，所以检查 status 属性的语句需要封装在 try-catch 中

```javascript
var xhr = createXHR()
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        alert(xhr.responseText)
      } else {
        alert(`Request was unsuccessful: ${xhr.status}`)
      }
    } catch (ex) {}
  }
}

xhr.open('get', 'timeout.php', true)
xhr.timeout = 1000 // 1s
xhr.ontimeout = function() {
  alert('Request timeout')
}
xhr.send(null)
```

### 21.2.3 overrideMimeType()方法

Firefox 最早引入 overrideMimeType()方法用于重写 XHR 响应的 MIME 类型。可以保证把响应当做指定类型处理。

```javascript
var xhr = createXHR()
xhr.open('get', 'text/php', true)
xhr.overrideMimeType('text/xml')
xhr.send(null)
```

## 21.3 进度事件

Progress Event 进度事件用于定义客户端与服务器之间通信相关的事件，主要包括 6 个：

- loadStart：接收到响应数据第一字节时触发；
- progress：接收响应期间不断触发；
- error： 请求出错时触发；
- abort：因调用 abort()方法终止连接时触发；
- load：接收到完整的响应数据时触发；
- loadend：通信完成时触发。

每个请求都从 loadstart 开始，经由一个或多个 progress，然后触发 error | abort | load 中的一个，最终以 loadend 结束。目前没有浏览器支持 loadend。

```javascript
var xhr = createXHR()
xhr.onload = function(event) {
  // 无需再校验readyState
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    alert(xhr.responseText)
  } else {
    alert(`Request was unsuccessful: ${xhr.status}`)
  }
}

xhr.onprogress = function(event) {
  var divStatus = document.getElementById('status')
  if (event.lengthComputable) {
    divStatus.innerHTML = `Received ${event.position} of ${event.totalSize} bytes`
  }
}

xhr.open('get', 'altevents.php', true)
xhr.send(null)
```

#### load 事件

load 事件用于替代 readystatechange 事件，响应接收完毕后触发 load 事件，因此无需再校验 readyState。

#### progress 事件

progress 事件会在接收新数据期间周期性触发，onprogress 事件处理程序会接收到一个 event 对象，其 target 属性指向 XHR 对象，并且 event 包含三个额外属性：

- lengthComputable：表示进度信息是否可用；
- position：表示已经接收的字节数；
- totalSize：根据 Content-Length 计算出来。

## 21.4 跨域资源共享

XHR 对象要求只能访问同源资源。但是实现合理的跨域请求有时至关重要。

#### CORS

CORS 是 W3C 解决跨域问题的一个草案。其基本思想是通过使用自定义头部让浏览器与服务器进行沟通，从而决定应该相应还是失败。举例：

在发送一个简单请求时，增加 Origin 头部：

```http
Origin: http://www.test.net
```

如果服务器认为是一个可以接受的请求，就在`Access-Control-Allow-Origin`头部中回发相同的源信息，或者`*`代表公共资源。

```http
Access-Control-Allow-Origin: http:www.test.net
```

如果没有这个头部，或者头部不匹配，浏览器会驳回请求。

注意，请求和响应都不包含`cookie`信息。

### 21.4.1 IE 对 CORS 的实现

IE8 引入`XDomainRequest`，与 XHR 类似，但能实现安全可靠的跨域通信。

XDR 与 XHR 区别：

- cookie 不会随请求发送，也不会随响应返回；
- 只能设置头部信息中的 Content-Type 字段；
- 不能访问响应头部信息；
- 只支持 GET 和 POST 请求；
- 只支持异步执行。

```javascript
var xdr = new XDomainRequest()
xdr.onload = function() {
  alert(xdr.responseText)
}
xdr.onerror = function() {
  alert('An error occurred.')
}
xdr.open('get', 'http://somewhere-else.com/page/*')
xdr.send(null)
```

### 21.4.2 其他浏览器对 CORS 的实现

其他浏览器仍然是通过 XMLHttpRequest 对象实现了对 CORS 的原生支持，只需要在使用 XHR 对象的 open 方法时传入绝对 URL 即可。

与 XDR 不同：

- 可以访问 status 和 statusText；
- 支持同步请求。

跨域 XHR 限制：

- 不能使用 setRequestHeader()设置自定义头部；
- 不能发送和接收 cookie；
- 通过 getAllResponseHeaders()方法总会返回空字符串。

建议：同源最好使用相对 URL，远程资源使用绝对 URL。

### 21.4.3 Preflighted Requests

在发送非简单请求时，浏览器会预发送一个 Preflighted 请求，这种请求使用 options 方法，发送下列头部：

- Origin: 与简单请求相同；
- Access-Control-Request-Method: 请求自身使用的方法；
- Access-Control-Request-Header: 自定义头部，多个以逗号分隔。

服务器接收到这种请求通过响应以下头部与浏览器进行沟通：

- Access-Control-Allow-Origin: 与简单请求相同；
- Access-Control-Allow-Methods: 允许的方法，多个以逗号分隔；
- Access-Control-Allow-Headers: 允许的头部，多个以逗号分隔；
- Access-Control-Max-Age: Preflight 请求缓存时间。

Preflight 请求会按 Max-Age 指定时间缓存。

举例：

```http
Origin: http://www.test.net
Access-Control-Request-Method: POST
Access-Control-Request-Header:NCZ

Access-Control-Allow-Origin: http://www.test.net
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: NCZ
Access-Control-Max-Age: 1728000
```

### 21.4.4 带凭据的请求

跨域请求默认不提供凭据（cookie、HTTP 认证及客户端 SSL 证明）。

设置 XHR 的`withCredentials`属性为 true，可以指定某个请求应该发送凭据。如果服务器接受带凭据的请求，会以下头部响应：

`Access-Control-Allow-Credentials: true`

如果发送带凭据的请求，而服务器不支持，那么浏览器会调用 onerror 事件处理。

### 21.4.5 跨浏览器的 CORS

检查是否存在`withCredentials`属性，可以确定 XHR 是否支持 CORS，不支持则可以继续检测`XDomainRequest`是否存在。

```javascript
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest()
  if ('withCredentials' in xhr) {
    xhr.open(methods, url, true)
  } else if (typeof XDomainRequest != 'undefined') {
    xhr = new XDomainRequest()
    xhr.open(methods, url)
  } else {
    xhr = null
  }
  return xhr
}

var request = createCORSRequest('get', 'http://www.somewhere-else.com/page/')

if (request) {
  request.onload = function() {
    // handler
  }
  request.send(null)
}
```

## 21.5 其他跨域技术

### 21.5.1 图像 Ping

- 原理："img"标签可以加载任何网页的图像；通过监听 onload 和 onerror 可以确定是否接收了响应；
- 缺点：只能发送 GET 请求；无法访问服务器响应文本。

```javascript
var img = new Image()
img.onload = img.onerror = function() {
  alert('Done!')
}
img.src = 'http://www.example.com/test?name=Nicholas'
```

### 21.5.2 JSONP

- 原理："script"标签的 src 可以加载任何域的资源；通过将 src 设置为接口，控制接口响应为 callback(data)，在页面内直接执行 callback 方法，拿到数据；
- 缺点：1、一定注意 jsonp 的安全性，应该如果不是自己的服务，这可能会夹带恶意代码；2、很难确定 JSONP 请求是否失败。

```javascript
function handleResponse(response) {
  alert("You're at IP address " + response.IP)
}

var script = document.createElement('script')
script.src = 'http://freegeoip.net/json/?callback=handleResponse'
document.body.insertBefore(script, document.body.firstChild)
```

### 21.5.3 Comet

Comet 意指“服务器推送”，是一种服务器向页面推送数据的技术。

实现 Comet 的方式有两种：长轮询和流。

#### 长轮询与短轮询

短轮询：浏览器定时向服务器发送请求，查看是否有更新数据；
长轮询：浏览器发送请求之后，服务器一直保持连接打开，直到有数据可发送。发送完成之后，关闭连接，随后立刻再次发送请求，如此循环。

#### HTTP 流

在页面整个生命周期内只使用一个 HTTP 连接。浏览器向服务器发送请求后，服务器保持连接打开，然后周期性向浏览器发送数据。

```javascript
function createStremingClient(url, progress, finished) {
  var xhr = new XMLHttpRequest(),
    received = 0

  xhr.open('get', url, true)
  xhr.onreadyStateChange = function() {
    var result
    if (xhr.readyState == 3) {
      result = xhr.responseText.subString(recevied)
      received += result.length

      progress(result)
    } else if (xhr.readyState == 4) {
      finished(xhr.responseText)
    }
  }
  xhr.send(null)
  return xhr
}
```

### 21.5.4 服务端发送事件

SSE(Server-Sent Events)服务端发送事件，用于创建到服务器的单向连接，服务器可以通过这个连接发送任意数量的数据。

限制：

- 服务器响应的 MIME 类型必须是`text/event-stream`；
- 连接 url 必须是同源的。

```javascript
var source = new EventSource('myevents.php')
source.onmessage = function(event) {
  var data = event.data
}
source.close()
```

readyState 属性：0 - 正在连接到服务器；1 - 打开了连接；2 - 关闭了连接。

三个事件：

- open：建立连接时触发；
- message：从服务器接收到事件时触发；
- error：在无法建立连接时触发。

#### 事件流

所谓服务器事件会通过 HTTP 响应发送纯文本，最简单的情况是每个数据项都带有前缀 data:，例如：

```
data: foo

data: bar

data: foo
data: bar
```

第一个 message 返回的 event.data 值为"foo",
第二个 message 返回的 event.data 值为"bar",
第三个 message 返回的 event.data 值为"foo\nbar"。

通过 id 前缀可以为事件指定一个关联 ID，关联的事件在连接断开时会向服务器发送一个`Last-Event-ID`的 HTTP 头，告知服务器下次触发哪个事件，以确保浏览器接收数据的顺序正确。

### 21.5.5 Web Sockets

Web Sockets 在单独的持久连接上提供全双工、双向通信。先使用 HTTP 建立连接，建立好之后会转换为 Web Socket 协议(ws://)。ws 自定义协议优势是数据包小。

注意：

- WebSocket 没有同源限制；
- 只能发送纯文本数据，对于其他复杂数据需要提前序列化。

事件：

- onmessage：用于接收数据；
- open：成功建立连接时触发；
- error：发生错误时触发，连接不能持续；
- close： 在连接关闭时触发。

示例：

```javascript
var socket = new WebSocket('ws://www.example.com/server.php')
socket.send('Hello world!')
var message = {
  time: new Date(),
  text: 'Hello world!',
  clientId: 'awdwdqd',
}
socket.send(JSON.stringify(message))

socket.onmessage = function(event) {
  var data = event.data
}

socket.onopen = function() {
  alert('Connection established.')
}
socket.onerror = function() {
  alert('Connection error.')
}
socket.onclose = function() {
  alert('Connection closed.')
}
```

### 21.5.6 SSE 与 Web Sockets

选择方式：

- 是否具有建立 ws 通信的能力；
- 是否需要双向通信。

## 21.6 安全

CSRF：Cross-Site Request Forgery 跨站请求伪造，是指对未授权系统有权访问某个资源的情况。

验证权限的几种可选做法：

- 要求 SSL 连接来访问可以通过 XHR 请求的资源；
- 要求每一次请求都要附带经过相应算法计算得到的验证码。

无效方法：

- 要求发送 POST 替换 GET —— 很容易改变；
- 检查来源 URL 确定是否可信 —— 很容易伪造；
- 基于 cookie 信息进行验证 —— 也很容易伪造。

## 21.7 总结

Ajax 是无需刷新页面就可以从服务器获取数据的一种方法。

- Ajax 核心是 XMLHttpRequest(XHR)对象；
- XHR 具有同源限制；同源是指：相同域、相同端口、相同协议；
- CORS 是跨域的一个解决方案，IE8 通过 XDomainRequest 支持 CORS，其他浏览器通过 XHR 原生支持；
- 图像 ping 和 JSONP 都是用来解决跨域，其原理是用 img 和 script 标签的 src 可以访问跨域资源实现的，这两种方式不如 CORS 稳妥。

Comet 是对 Ajax 的进一步扩展，让服务器几乎能够实时地向客户端推送数据。

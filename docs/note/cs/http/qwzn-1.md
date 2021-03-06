---
title: http权威指南读书笔记
description: 若开始，请至终。
author: wangyunfei
date: 2019-05-20
tags: http
---

# http 权威指南

todo: 图片需从另一台 pc 同步一下

# 第一部分 HTTP： Web 的基础

## 1. http 概述

- web 客户端和服务器是如何通信的；—— HTTP 协议是载体
- web 内容资源来自何方；—— 提供资源方为服务器方
- web 事务是什么，如何工作；—— 事务等于请求+响应
- HTTP 报文格式；—— 起始行，首部字段，主体
- 底层 TCP 网络传输；—— HTTP 传输内容前需要先建立 TCP/IP 连接
- HTTP 协议变体；—— 目前广泛使用的版本是 HTTP/1.1
- web 的架构组件结构；—— 包括缓存，代理，网关，隧道，Agent 代理等

疑问？

- 什么是 web 事务——一个事务 = 一个请求 + 一个响应，是指从客户端发送请求到服务器端响应请求的完整过程；
- 协议变体是不是指 https——不是，是指 http 的不同历史版本，现在正在广泛使用的是 HTTP/1.1；
- web 架构组件是什么？——除客户端及服务端外，其他的 web 组成部分，比如缓存，代理，网关等。

### 1.1 HTTP——因特网的多媒体信使

HTTP 可以将图片、视频、文本、音频等等多媒体资源从世界各处的 web 服务器搬运到 web 浏览器上去；

HTTP 是使用可靠的数据传输协议，能够确保数据在传输过程中不被损坏或产生混乱。

### 1.2 web 服务器和客户端

存放 web 内容的就是 web 服务器，而发出请求并接收服务器返回数据的就是 web 客户端，比如浏览器。

当客户端发出请求后，服务器处理请求，寻找资源，并将资源对象，对象类型，对象长度及其他信息放在 http 响应中发送给客户端。

### 1.3 资源

所有类型的来源都是 web 资源，不仅仅包括 web 服务器中的静态文件，数据接口，搜索引擎等。

#### 1.3.1 媒体类型(MIME)

web 服务器会为所有 HTTP 对象附加 MIME 类型。MIME 是一种文本标记，表示一个主要对象类型和一个特定子类型，比如：

- HTML 文本文档：text/html
- 普通的 ASCII 文本文档：text/plain
- GIF 图：image/gif

#### 1.3.2 URI

URI 统一资源标识符，为 web 服务器所有资源命名。在世界范围内唯一标识。目前 URI 有两种形式：URL 和 URN。

URL 统一资源定位符，描述了一台特定服务器上某资源的特定位置。每个 URL 通常包括三个部分：

- 协议方案，比如：http、ftp；
- 服务器因特网地址，比如：www.iqiyi.com
- 服务器上资源地址，比如：/test/image.gif

URN 统一资源名，与资源目前的位置无关，资源在任何时间任何位置，通过 URN 都可以定位到。

举例：

- https://www.zhihu.com/question/21950864：URL，指出了资源的具体位置；
- ftp://example.com/download.zip：URL，虽然使用了不同协议，但同样指出了资源位置；
- urn:isbn:0-486-27557-4：URN，指定了某本图书，但是没有指定具体位置。

URI 是一种概念，旨在为所有 web 资源命名，这样客户端就可以根据自己的需要获取执行资源。而 URL 和 URN 就是这种概念的实现。目前几乎所有 URI 都是 URL。

### 1.4 事务

一个 HTTP 事务是由一条请求和一个响应结果组成。请求是由客户端发往服务器的，而响应则相反。

![image-20190520111319723](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190520111319723.png)

#### 1.4.1 方法

每个 HTTP 请求都包含一个方法，用于告诉服务器要执行什么动作（获取一个 Web 页面，运行一个网关程序，删除一个文件等）。常见的方法有：

- GET：执行从服务器想客户端发送命名资源；
- POST：向客户端数据发送到一个指定网关；

其它比如：PUT、DELETE、HEAD 等方法，详见第三章。

#### 1.4.2 状态码

每个 HTTP 响应中都包含一个状态码，告知客户端是否成功，或者是否需要采取其它动作。状态码是三位数字，常见状态码有：

- 200：OK，文档正确返回；
- 302：Redirect，重定向，到别的地方去获取资源；
- 404：Not Found， 无法找到这个资源。

伴随着每个状态码，HTTP 还会发送解释性“原因短语”文本，比如：

```bash
200 OK
200 Success
200 All's cool
```

虽然原因短语不同，但处理过程都是使用状态码，详见第三章。

#### 1.4.3 web 页面可以包含多个对象

应用程序完成一项任务时通常会发布多个 HTTP 事务。比如 web 浏览器会发布一系列 HTTP 事务来获取并显示一个包含了丰富图片的 web 页面。复合 web 页面要为每个嵌入式资源使用一个单独的 HTTP 事务。

### 1.5 报文

HTTP 报文包括：请求报文(request message)和响应报文(response message)两种类型。报文包括三部分：

- 起始行：第一行，请求中说明要做什么，响应中说明出现什么情况；
- 首部字段：包含一个名字和一个值，以冒号(:)分隔，以空行结束；
- 主体：可选，起始行和首部都是文本格式且都是结构化的，而主体中可以包含任意的二进制数据（比如图片，视频，音轨，软件程序）。

![image-20190520114013245](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190520114013245.png)

### 1.6 连接

HTTP 是应用层协议，它不关心网络通信的细节，而是将细节都交给了通用，可靠的传输层协议 TCP/IP。

![image-20190520115337051](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190520115337051.png)

在 HTTP 客户端发送报文之前，需要在客户端与服务器之间建立一条 TCP/IP 连接，而建立连接的方式就是通过服务器 IP 地址及运行软件的端口号定位到 web 服务器。我们来看截个 URL：

```bash
http://207.200.83.29:80/index.html
http://www.netscape.com:80/index.html
http://www.netscape.com/index.html
```

第一个 url 直接使用了 ip+端口；

第二个使用了域名，就是 IP 的人性化别称，可以通过域名服务（Domain Name Services, DNS）机制方便将域名转换为 IP 地址；

第三个简化了端口，因为默认端口为：80，一个基本的浏览器连接处理如图：

![image-20190520120047274](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190520120047274.png)

### 1.7 协议版本

- HTTP/0.9：原型版本，最老版本，只支持 GET，不支持多媒体内容的 MIME 类型、各种 HTTP 首部，或者版本号；很快被 HTTP/1.0 取代；
- HTTP/1.0：第一个得到广泛使用的版本。增加了版本号，各种 HTTP 首部，额外方法，以及对多媒体对象的处理；
- HTTP/1.0+：非正式的 HTTP 扩展版本，增加了很多特性，包括持久的 keep-alive，虚拟主机，代理连接等；
- HTTP/1.1：重点校正 HTTP 设计中的结构性缺陷，明确语义，引入重要的性能优化措施，删除不好的特性。包含了对正在发展中的更复杂的 web 应用程序和部署方式的支持。是当前使用的 http 版本(2.0 之前)；
- HTTP-NG（又名 HTTP/2.0）：重点关注性能的大幅优化，以及更强大的服务逻辑远程执行框架。

### 1.8 web 的结构组件

- 代理：客户端与服务器之间的 HTTP 中间实体，可以对请求和响应进行过滤等；
- 缓存：HTTP 的仓库，使常用页面副本可以保存在离客户端更近的地方。详见第七章；
- 网关：连接其他应用程序的特殊 web 服务器；
- 隧道：对 HTTP 通信报文进行盲转发的特殊代理，比如 HTTPS 中的 SSL；
- Agent 代理：发起自动 HTTP 请求的半智能 web 客户端。

## 2. URL 与资源

- URL 语法，以及各种 URL 组件的含义及其所做的工作；

```bash
<scheme>://<user>:<passwd>@<host>:<port>/<path>:<params>?<query>#<frag>
```

- 很多 Web 客户端都支持的 URL 快捷方式，包括相对 URL 和自动扩展 URL；——相对 URL 与基础 URL，自动扩展是浏览器做的；
- URL 编码和字符规则；——URL 使用的是 US-ASCII 码，转义方式%+两个表示 ASCII 码的十六进制数；
- 支持各种因特网信息系统的常见 URL 方案；——各种不同协议；
- URL 的未来，包括 URN——这种框架可以在对象从一处搬到另一处时，保持稳定的访问名称。——总之不太好实现。。

疑问？

- URL 组件是什么？—— 其实就 URL 的各个组成部分，比如方案、主机名、端口等
- URL 快捷方式？为什么 URL 还需要自动扩展？——快捷方式其实就是相对 URL，自动扩展其实是浏览器的自动填充功能
- 各种因特网信息系统？——各种不同协议，比如：http,https,ftp,mailto,news,file,telnet,rtsp 等

### 2.1 浏览因特网资源

HTTP 规范将 URI 作为其资源标识符，供浏览器寻找。但实际上，HTTP 应用程序处理的只是 URI 的子集——URL。关于其中区别，详见 1.3.2。

举例：http://www.example.com/path/index.html

URL 分以下三部分：

- 第一部分：http 是 URL 方案（scheme）告知客户端怎样访问资源；
- 第二部分：www.example.com 指的是服务器的位置；告知客户端资源位于何处；
- 第三部分：资源路径，说明具体要请求的是哪个资源。

除 HTTP 以外，URL 可以指向因特网上的任意资源，比如 E-mail 账户：

```bash
mailto:president@whitehouse.gov
```

或者其他资源：

```bash
ftp://ftp.lots-o-books.com/pub/complete-price-list.xls
```

其实，这是由浏览器实现其中细节，让用户可以直接输入 url 就获取指定资源。

### 2.2 URL 的语法

URL 提供了一种定位网上任意资源的手段，这些资源可以通过各种不同的方案来访问，比如：HTTP、FTP、SMTP 等。大部分 URL 都遵循通用的 URL 语法，这个语法格式由九部分构成：

```bash
<scheme>://<user>:<password>@<host>:<port>/<path>;<param>?<query>#<frag>
```

其中最重要的三部分为方案`<scheme>`、主机`<host>`、路径`<path>`。

#### 2.2.1 方案——使用什么协议

方案规定如何访问指定资源的主要标识符，比如 http。方案组件必须以一个字母符号开始，由第一个":"符号将其与 URL 其余部分分隔开来。方案名大小写无关。

#### 2.2.2 主机和端口

URL 主机用于标识因特网上资源位于哪台机器上，而端口则是说明资源在那台机器的什么地方。主机可以是域名也可以是端口，比如，下面两个 URL 就是同一资源：

```bash
http://www.joes-hardware.com:80/index.html
http://161.58.228.45:80/index.html
```

端口组件标识了服务器正在监听的网络端口。对于下层使用了 TCP 协议的 HTTP 来说，默认端口号为 80。

#### 2.2.3 用户名和密码

很多服务器要求输入用户名和密码才会允许用户访问数据。用户名和密码组件需要使用@字符将其与 URL 其余部分分隔开来。用户与密码之前使用“:”分隔。FTP 服务器就是这样一个常见的实例。

```bash
ftp://ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous@ftp.prep.ai.mit.edu/pub/gnu
ftp://anonymous:my_passwd@ftp.prep.ai.mit.edu/pub/gnu
http://joe:joespasswd@www.joes-hardware.com/sales_info.txt
```

第一个例子就是没有用户名和密码组件。如果 URL 方案要求输入用户名和密码，但没有提供，它通常会插入一个默认值，比如插入一个 anonymous 用户，并发送默认密码（IE：IEUser，Netscape Navigator：mozilla）。

#### 2.2.4 路径及 2.2.5 参数组件

URL 路径说明了资源位于服务器的什么地方，可以使用“/”将 URL 路径组件划分成一些路径段（这与 linux 文件系统路径一致），每个路径段都可以有自己的参数组件。比如：

```bash
http://www.joes-hardware.com/hammers;sale=false/index.html;graphics=true
```

这个例子中有两个路径段，hammers 和 index.html。hammers 路径段参数 sale，值为 false。index.html 段有参数 graphics，值为 true。

#### 2.2.6 查询字符串

很多互联网资源，比如数据库服务，都是可以通过提问题或者进行查询来缩小所请求资源类型范围的。举个例子，我们想查询数据库中是否存在：编号为 12731，颜色为蓝色，尺寸为 large 的条目：

```bash
http://www.joes-hardware.com/inventor-check.cgi?item=12731&color=blue&size=large
```

查询组件位于"?"之后，查询字符串以一系列“名=值”对出现，名值对之间用“&”分隔。在这个例子中查询组件有三个名值对：item=12731、color=blue、size=large。

#### 2.2.7 片段

有些资源，比如 HTML，可以进一步划分。为了引用部分资源或资源的一个片段，URL 支持使用片段组件来表示一个资源内部的片段。

片段挂在 URL 的右手边，最前面有一个字符“#”，比如：

```bash
http://www.joes-hardware.com/tools.html#drills
```

在例子中，片段 drills 引用了服务器上页面/tools.html 中的一部分。

HTTP 服务器通常只处理整个资源对象，而不是某个片段，客户端不能将片段传送给服务器。浏览器从服务器获得整个资源之后，会根据片段来显示你感兴趣的那部分资源。

### 2.3 URL 快捷方式

#### 2.3.1 相对 URL

相对 URL 是在某资源内部指定另一个资源的缩略方式。相对 URL 是不完整的，需要根据基础 URL 解析出绝对 URL 使用。基础 URL 可以在 html 中使用标记`<BASE>`显式指定。如果没有指定，则可以将它所属资源的 URL 作为基础。

#### 2.3.2 自动扩展 URL

我理解就是浏览器的自动补全，有主机名补全和历史扩展两种，主机名扩展比如输入 iqiyi，自动补全 www 和.com。历史扩展就是从历史记录里读取了。因为是浏览器功能，不深入探讨了。

### 2.4 各种令人头疼的字符

URL 是用来统一地命名因特网上所有的资源，这意味着要通过不同协议传送这些资源，所以可以通过任意互联网协议安全传输是很重要的。从设计角度看，URL 需要包括以下几个特点：

- 安全传输：安全传输意味着不能丢失信息。比如电子邮件传输协议（SMTP），会剥去特定的字符。为了避开这些问题，URL 只能使用相对较小的、通用安全字母表中的字符；
- 可读性良好：不可见、不可打印的字符不能在 URL 中使用；
- 完整性：有时可能会希望 URL 中包含除通用的安全字母表之外的二进制数据或字符。因此需要转义机制，能够将不安全的字符编码为安全字符，再进行传输。

#### 2.4.1 URL 字符集

目前 URL 使用的是 US-ASCII 编码。历史悠久可移植性好。

#### 2.4.2 编码机制

亦即转义，用来在 URL 中表示各种不安全的字符。这种转义法包含一个百分号（%），后面跟着两个表示字符 ASCII 码的十六进制数。比如空格，ASCII 码：32(0x20)，URL：http://www.joes-hardware.com/more%20tools.html。

#### 2.4.3 字符限制

在 URL 中，有些字符被保留起来，有特殊的含义：

![image-20190522101215509](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522101215509.png)

## 3. HTTP 报文

- 报文是如何流动的；——上游下游，流入流出；
- HTTP 报文的三个组成部分；——起始行，首部字段，主体；
- 请求和响应报文之间的区别；——报文的语法不同；
- 请求报文支持的各种方法；——GET,POST,DELETE,PUT,HEAD,OPTIONS,TRACE；
- 和响应报文一起返回的各种状态码；——一到五；
- 各种各样的 HTTP 首部都是用来做什么的。——这章是个综述吧，详细的需要到各个章节学习。

不错不错，正是需要梳理一遍的知识：

- 状态码都是做什么的，好好梳理一下；
  - 1xx：信息性状态码；100 Continue，确认服务器是否接受要发送的实体；
  - 2xx：成功状态码；比如 200 OK，202 接受，但不一定已经完成请求；
  - 3xx：重定向，301 永久重定向；302 临时重定向；
  - 4xx：客户端错误，比如 404 找不到，400 错误请求；
  - 5xx：服务器错误，比如 500 服务器内部错误，501 超出服务器能力范围。
- 各种各样的首部作用；——比较宽泛，需要到各个章节具体学习，不过至少可以知道分为通用、请求、响应、实体四种首部

### 3.1 报文流

报文流入(inbound)源端服务器，工作完成后流出(outbound)，流向用户 Agent 代理。而所有报文的发送者都在接收者上游(upstream)，所有报文都会向下游(downstream)流动。

![image-20190522114532955](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522114532955.png)

![image-20190522114552291](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522114552291.png)

### 3.2 报文的组成部分

HTTP 报文是简单的格式化数据块。每条报文由三部分组成：对报文进行描述的起始行、包含属性的首部快，以及可选的主体部分。

起始行和首部都是由行分隔的 ASCII 文本。每行都以一个由两个字符组成的行终止序列作为结束，包括一个回车符，和一个换行符。这个终止序列可以写作 CRLF。虽然规范是这样规定的，但是健壮的应用程序应该可以接受单个换行符作为行的终止。

主体中可包含文本或二进制数据，也可以为空。

![image-20190522141603901](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522141603901.png)

#### 3.2.1 报文的语法

所有的 HTTP 报文可以分为两类：请求报文(request message)和响应报文(response message)。

```bash
# 请求报文 - 语法
<method> <request-URL> <version>
<headers>

<entity-body>
# 请求报文 - 示例
GET /test/hi-there.txt HTTP/1.1
Accept: text/*
Host: www.joes-hardware.com

# 注意首部字段和主体之间有一个空格↑

# 响应报文 - 语法
<version> <status> <reason-phrase>
<headers>

<entity-body>
# 响应报文 - 示例
HTTP/1.1 200 OK
Content-type: text/plain
Content-length: 19

Hi! I'm a message!
```

对各部分的简要描述：

- 方法`<method>`：客户端希望服务器对资源执行的动作；比如：GET、HEAD 或 POST；
- 请求 URL`<request-URL>`：资源的 URL 路径组件的完整 URL，可以不包含主机/端口，一般服务器可以假定是自己主机和端口；
- 版本`<version>`：报文所使用的 HTTP 版本，格式：`HTTP/<major>.<minor>`；
- 状态码`<status-code>`：三位数字，用于描述请求过程中所发生的情况；
- 原因短语`<reason-phrase>`：对状态码的描述，只对人类有意义，机器处理还是按照状态码处理；
- 首部`<header>`：可以有零到多个首部，每个首部都包含一个名字 加 冒号(:)，然后可选空格，接着是一个值，最后是一个 CRLF。首部是由一个空行（CRLF）结束的。表示首部结束和主体部分开始；
- 主体部分`<entity-body>`：包含任意数据组成的数据块。

#### 3.2.2 起始行

所有的 HTTP 报文都是以一个起始行作为开始。请求报文的起始行说明要做些什么；响应报文的起始行说明发生了什么。

- 请求行：请求报文的起始行。包含方法、路径、HTTP 版本，由空格分开；
- 响应行：响应报文的起始行。包含 HTTP 版本、状态码、原因短语，由空格分开；
- 方法：告知服务器要干什么，比如 GET 用于获取文档，POST 发送需要处理的数据。除了通用方法外，服务器还可以实现自己的请求方法，这些附加方法是对 HTTP 的扩展，称为扩展方法；
- 状态码：用于告诉客户端发生了什么事。比如 200 代表成功。常见状态码比如 200 代表成功，401 代表未授权，需要用户名和密码，404 代表未找到，服务器找不到 URL 对应的资源。状态码可以根据范围进行分类，如图：

![image-20190522155432479](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522155432479.png)

- 原因短语：原因短语和状态码是成对出现的，是状态码的可读版本；
- 版本号：形式 - HTTP/x.y 。为 HTTP 应用程序提供一种将自己所遵循的协议版本告知对方，以便互相了解对方的能力和报文格式；

#### 3.2.3 首部

HTTP 首部字段给请求和响应报文添加了一些附加信息。本质上说，它们只是一些名/值对的列表。首部可以分出几类，比如通用首部、请求首部、响应首部、实体首部、扩展首部等等。但其实这没什么关系，应用程序可以随意自己发明首部。常见首部示例：

![image-20190522161840676](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190522161840676.png)

首部延续行是指当首部特别长时，可以另起一行，多出来的每行前面至少要有一个空格或制表符。比如：

```bash
Server: Test Server
	Version 1.0
```

其中 `Version 1.0`就是新行。完整首部是`Test Server Version 1.0`

#### 3.2.4 主体部分

HTTP 主体部分是 HTTP 要传输的内容，可以包括很多类型的数字数据：图片、视频、HTML 文档、软件应用程序、信用卡事务、电子邮件等。

#### 3.2.5 版本 0.9 的报文

HTTP/0.9 报文请求中只包含方法和请求 URL，响应只包含实体，没有版本信息，没有状态码，或原因短语，也没有首部。

### 3.3 方法

服务器一般不会实现所有方法。如果一台服务要与 HTTP 1.1 兼容，那么只要为其资源实现 GET 方法和 HEAD 方法就可以了。

#### 3.3.1 安全方法

GET 和 HEAD 方法都被认为是安全的，意味着使用这些方法的 HTTP 请求都不会产生什么动作。

#### 3.3.2 GET 3.3.3 HEAD

GET 是最常用的方法，通常用于请求服务器发送某个资源。

![image-20190523090141856](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523090141856.png)

而 HEAD 与 GET 方法行为很类似，但服务器在响应中只返回首部，不会返回实体部分。

![image-20190523090155265](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523090155265.png)

HEAD 作用：

- 在不获取资源的情况下了解资源的情况；
- 通过查看响应中的状态码，看看某个对象是否存在；
- 通过查看首部，判断资源是否被修改了。

#### 3.3.4 PUT

PUT 方法的语义就是服务器用请求的主体部分来创建一个由所请求的 URL 命名的文档。因为允许用户对服务器内容进行修改，所以很多 Web 服务器都要求 PUT 之前，用密码登录。

![image-20190523090620974](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523090620974.png)

#### 3.3.5 POST

POST 起初是用来向服务器输入数据的。但是实际上，通常用它来支持 HTML 的表单。

![image-20190523091048741](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523091048741.png)

#### 3.3.6 TRACE

TRACE 方法允许客户端在最终将请求发送给服务器时，看看它变成了什么样子。TRACE 方法用于诊断，用于验证请求是否如愿穿过了请求/响应链。可以查看代理和其他应用程序对请求产生的影响。

TRACE 请求中不能带有实体的主体部分。TRACE 响应的主体包含了响应服务器收到的请求的精确副本。

![image-20190523091441334](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523091441334.png)

#### 3.3.7 OPTIONS

OPTIONS 方法请求 web 服务器告知其支持的各种功能，可以询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法。

![image-20190523092526515](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523092526515.png)

#### 3.3.8 DELETE

DELETE 方法让服务器删除请求 URL 所指定的资源。但是客户端无法保证删除操作一定会被执行，因为 HTTP 规范允许服务器在不通知客户端的情况下撤销请求。

![image-20190523092744944](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190523092744944.png)

#### 3.3.9 扩展方法

HTTP 被设计成字段可扩展的，服务器可以为它所管理的资源实现一些特定的 HTTP 方法。比如提供 LOCK 方法锁定资源，COPY 方法复制资源等等。

## 3.4 状态码

状态码为客户端提供了一种理解事务处理结果的便捷方式。

#### 3.4.1 100 ~ 199 —— 信息性状态码

![image-20190531094019588](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190531094019588.png)

##### 关于 100 Continue

客户端在向服务器端发送一个实体，并且愿意在发送实体之前等待 100 Continue 响应，那么客户端就要发送一个携带了值为 100 Continue 的 Expect 请求首部。这是一种优化，客户端只有在避免向服务器发送一个无法处理或使用的大实体时，才应该使用 100 Continue。

对于客户端而言，即使先发送了 100 Continue 也不应该永远等待服务器响应。超时一定时间之后，应该直接将实体发送过去。

对于服务器而言，如果收到一个 100 的请求，它会用 100 Continue 或者错误码进行响应，如果响应之前就收到了实体，则不需要再返回这个状态码，但是读取完实体之后，还是应该返回一个最终状态码。

对于代理而言，如果它知道下一跳服务器只能与 HTTP/1.1 之前版本兼容，应该以 417 Expectation Failed 错误进行响应。

#### 3.4.2 200 ~ 299 —— 成功状态码

![image-20190531095117135](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190531095117135.png)

- 关于 200 就是最常用的成功状态码；
- 201 主要针对 put 请求，服务器创建实体之后，返回 201 Created 代表已创建资源的；
- 202 代表请求接受了，但是服务器还未真正处理，也不保证服务器会完成这个请求；

#### 3.4.3 300 ~ 399 —— 重定向状态码

![image-20190610093907139](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610093907139.png)

![image-20190610093927830](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610093927830.png)

301 是旧 url 已被永久移除，响应的 Location 首部中包含资源最新的 URL。而 302 是一个临时定位状态码，将来请求仍然使用老的 URL。304 代表响应一个有条件的请求，而最近资源未被修改的话，就可以使用这个状态码说明资源未被修改，带有这个状态码的响应不应该包含实体的主体部分。

#### 3.4.4 400 ~ 499 —— 客户端错误状态码

客户端发送一些服务器无法处理的请求，比如格式错误的请求报文，或者请求一个不存在的 URL。

![image-20190610095115563](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610095115563.png)

![image-20190610095142264](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610095142264.png)

#### 3.4.5 500 ~ 599 —— 服务器错误状态码

客户端请求有效，但是服务器自身出错。

![image-20190610095532594](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610095532594.png)

![image-20190610095544605](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610095544605.png)

### 3.5 首部

首部和方法配合工作，共同决定了客户端和服务器能做什么事情。首部可以分为五个主要类型：

- 通用首部：服务器和客户端都可以使用，比如 Date，每一端都可以用它来说明构建报文的时间；
- 请求首部：请求报文特有，为服务器提供一些额外信息，比如客户端希望接收什么类型数据。例如：Accept: \*/\*，用来告知服务器，客户端接受任意媒体类型；
- 响应首部：服务器端使用，为客户端提供信息。比如 Server: Tiki-Hut/1.0，告知服务器版本；
- 实体首部：用于描述实体部分的首部。比如：Content-Type: text/html; charset=iso-latin-1；
- 扩展首部：非标准首部，应用程序开发者创建，但还未添加到已批准的 HTTP 规范中。

#### 3.5.1 通用首部

提供了报文相关的最基本信息。

![image-20190610100506866](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610100506866.png)

HTTP/1.0 引入了第一个允许 HTTP 应用程序缓存对象本地副本的首部，这样就不需要总是直接从服务端获取了。详见第七章。

![image-20190610100652002](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610100652002.png)

#### 3.5.2 请求首部

用于说明是谁或什么在发送请求、请求源自何处，或者客户端的喜好及能力。

![image-20190610101420333](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610101420333.png)

##### 1. Accept 首部

Accept 首部提供了客户端对返回资源的要求，包括它想要什么，可以使用什么，以及它不想要什么。这样服务器就可以对要发送的内容作出更明智的决定。

![image-20190610101618892](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610101618892.png)

##### 2. 条件请求首部

为请求加上某些限制，要求服务器在对请求进行相应之前，确保某个条件为真。

![image-20190610102151909](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610102151909.png)

##### 3. 安全请求首部

HTTP 本身支持一种简单的质询/相应认证机制，这会在第 14 章详细讨论。

![image-20190610102334181](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610102334181.png)

##### 4. 代理请求首部

第 6 章详细说明代理。

![image-20190610102420361](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610102420361.png)

#### 3.5.3 响应首部

用于说明谁在响应、响应者的功能，及一些与响应相关的一些特殊指令。

![image-20190610104734058](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610104734058.png)

##### 1. 协商首部

第 17 章讨论了协商，比如服务器上有某文档的法语及德语译稿。

![image-20190610104940597](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610104940597.png)

##### 2. 安全响应首部

是安全请求首部的响应侧。14 章会详细讨论。

![image-20190610105040174](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610105040174.png)

#### 3.5.4 实体首部

实体首部可以告知报文的接收者它在对什么进行处理。

![image-20190610111212469](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610111212469.png)

##### 1. 内容首部

提供了与实体内容有关的特性信息，说明了其类型、尺寸以及处理它所需的其它有用信息。

![image-20190610111327939](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610111327939.png)

##### 2. 实体首部缓存

第 7 章深入探讨。说明了什么时候进行缓存。

![image-20190610111420151](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610111420151.png)

## 4. 连接管理

- HTTP 是如何使用 TCP 连接的；——DNS 寻址，三次握手
- TCP 连接的时延、瓶颈以及存在的障碍；——寻址时延，连接时延，慢启动
- HTTP 的优化，包括并行连接、keep-alive(持久连接)和管道化连接；
- 管理连接时应该以及不应该做的事情。

这章估计和网络知识相关。

### 4.1 TCP 连接

几乎所有的 HTTP 通信都是由 TCP/IP 承载的，客户端可以打开一条 TCP/IP 连接，连接到可能运行在世界任何地方的服务器应用程序。一旦建立连接，客户端和服务器之间交换的报文永远不会丢失、受损或失序。一个简单的连接示例：

![image-20190610113731272](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610113731272.png)

#### 4.1.1 TCP 的可靠数据管道

TCP 为 HTTP 提供了一条可靠的比特传输管道，从 TCP 连接一端填入的字节会从另一端以原有的顺序、正确地传送出来。

#### 4.1.2 TCP 流是分段的，由 IP 分组传送

HTTP 传送报文时，会以流的形式将报文数据的内容通过一条打开的 TCP 连接按序传输。TCP 接收到数据流之后，会将数据流砍成被称作段的小数据块，并将段封装在 IP 分组中，通过网络传输。所有这些工作都是由 TCP/IP 处理的，对于 HTTP 层都是透明的。

![image-20190610115115279](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610115115279.png)

每个 TCP 段都是由 IP 分组承载的，每个 IP 分组都包括：

- 一个 IP 分组首部（通常为 20 字节）；
- 一个 TCP 段首部（通常为 20 字节）；
- 一个 TCP 数据块（0 个或多个字节）。

IP 首部包含了源和目的 IP 地址、长度和其它一些标记。TCP 端首部包含 TCP 端口号、控制标记，以及用于数据排序和完整性检查的一些数字值。

#### 4.1.3 保持 TCP 连接的正确运行

TCP 连接是通过 4 个值来识别的：

```bash
<源IP地址、源端口号、目的IP地址、目的端口号>
```

这四个值唯一地定义了一条连接，两条不同的 TCP 连接不能拥有四个完全相同的值。

#### 4.1.4 用 TCP 套接字编程

操作系统提供了一些操纵其 TCP 连接的工具，套接字 API 向 HTTP 程序员隐藏了 TCP 和 IP 的所有细节。

![image-20190610143703909](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610143703909.png)

![image-20190610143805260](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610143805260.png)

### 4.2 对 TCP 性能的考虑

HTTP 紧挨着 TCP 层，位于其上层，所以 HTTP 事务的性能很大程度上取决于底层 TCP 通道的性能。

#### 4.2.1 HTTP 事务的时延

![image-20190610144201096](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610144201096.png)

HTTP 时延主要原因：

- DNS 寻址：客户端要根据 URI 确定 Web 服务器的 IP 地址和端口号；
- 三次握手建立连接；
- 因特网传输请求报文，以及服务器处理请求报文都需要时间；
- 服务器响应也需要花费时间。

这些时延的大小取决于硬件速度、网络和服务器的负载，请求和响应报文的尺寸，以及客户端和服务器之间的距离。TCP 协议的技术复杂性也会对时延产生巨大的影响。

#### 4.2.2 性能聚焦区域

- TCP 连接建立握手；
- TCP 慢启动拥塞控制；
- 数据聚集的 Nagle 算法；
- 用于捎带确认的 TCP 延迟确认算法；
- TIME_WAIT 时延和端口耗尽。

如果要编写高性能的 HTTP 软件，就应该理解接上面的每一个因素。否则可以跳过。

#### 4.2.3 TCP 连接的握手时延

![image-20190610145432579](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610145432579.png)

TCP 连接握手需要经过以下几个步骤：

- 请求新的 TCP 连接时，客户端要向服务器发送一个小的 TCP 分组，这个分组设置了特殊的 SYN 标记，说明这是一个连接请求（图 a）；
- 如果服务器接受了连接，就会对一些连接参数进行计算，并向客户端回送一个 TCP 分组，这个分组中的 SYN 和 ACK 标记都被置位，说明连接请求已被接受（图 b）；
- 最后，客户端向服务器回送一条确认信息，通知它连接已成功建立（图 c）。现代 TCP 栈都允许客户端在这个确认分组中发送数据。

小的 HTTP 事务可能会在 TCP 建立上花费 50%或更多的事件。

#### 4.2.4 延迟确认

因特网自身无法确保可靠的分组传输，所以 TCP 实现了自己的确认机制来确保数据的成功传输。每个 TCP 段都有一个序列号和数据完整性校验和。每个段的接收者收到完整的段时，都会向发送者回送小的确认分组。如果发送者没有在指定的窗口时间内收到确认信息，发送者就认为分组已被破坏或损毁，并重发数据。

由于确认报文很小，所以 TCP 允许在发往相同方向的输出数据分组中对其进行“捎带”。其实就是因为确认报文小，所以在发送确认报文之前，让发送者“等等”看看是否有输出数据可以“捎带”这个小报文，这个等等一般就是一个特定的窗口时间（通常是 100~200 毫秒）内将确认报文放在缓冲区，然后寻找事能够捎带它的输出数据分组。如果这段时间内没有，就将确认信息单独分组传送。

#### 4.2.5 TCP 慢启动

TCP 连接会随着时间进行自我“调谐”，起初会限制连接的最大速度，如果数据成功传输，会随着时间的推移提高传输速度，这种调谐被称为 TCP 慢启动，用于防止因特网的突然过载和拥塞。

TCP 慢启动限制了一个 TCP 端点在任意时刻可以传输的分组数。简单说，每成功接收一个分组，发送端就有了发送另外两个分组的权限，每个分组都被确认之后就可以发送四个分组，以此类推。这种方式被称为“打开拥塞窗口”。

由于存在这种拥塞控制特性，新连接的传输速度会比已经交换过一定量数据的、“已调谐”连接慢一些。所以 TTP 中有一些可以复用现存连接的工具。其实就是 HTTP 的”持久连接“。

#### 4.2.6 Nagle 算法与 TCP_NODELAY

TCP 有一个数据流接口，应用程序可以放入任意尺寸的数据到 TCP 栈中，即使一次只放一个字节也是可以的。但是不管数据有多小，都至少装载了 40 字节的标记和首部。所以如果 TCP 发送了大量的包含少量数据的分组，网络的性能就会严重下降。

Nagle 算法试图在发送一个分组之前，将大量的 TCP 数据绑在一起，以提高网络效率。该算法鼓励发送全尺寸的段。只有当其他分组都被确认之后，Nagle 算法才允许发送非全尺寸的分组，否则就将数据缓存起来。只有当挂起分组被确认或者缓存中积累了足够发送一个全尺寸分组的数据时，才会将缓存数据发送出去。

这带来一些 HTTP 性能问题：

- 小的报文可能无法填满一个分组，可能会因为等待那些永远不会到来的额外数据而产生时延；
- 其次，这与延迟确认之间的交互存在问题。该算法会在确认分组抵达之前阻止数据的发送，但是确认分组自身会被延迟确认算法延迟 100~200 毫秒。

HTTP 应用程序常常会在自己的栈中设置 TCP_NODELAY 参数，禁用 Nagle 算法提高性能。如果要这么做，一定要确保会向 TCP 写入大块的数据，这样就不会产生一堆小分组。

#### 4.2.7 TIME_WAIT 累积与端口耗尽

没细看

### 4.3 HTTP 连接的处理

#### 4.3.1 常被误解的 Connection 首部

HTTP 的 Connection 首部字段中有一个由逗号分隔的连接标签列表，这些标签为此连接指定了一些不会传播到其他连接中去的选项。Connection 首部可以承载 3 种不同类型的标签：

- HTTP 首部字段名，列出了只与此连接有关的首部；
- 任意标签值，用于描述此连接的非标准选项；
- 值 close，说明操作完成之后需关闭这条持久连接。

如果连接标签中包含了一个 HTTP 首部字段的名称，那么这个首部字段就包含了与一些连接有关的信息，不能将其转发出去，在将报文转发出去之前，必须删除 Connection 首部列出的所有首部字段。

![image-20190610162302889](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610162302889.png)

#### 4.3.2 串行事务处理时延

如果只对连接进行简单的管理，TCP 的性能时延可能会叠加起来。比如一个页面包含 3 个嵌入图片，每个事务都需要串行地建立一条新连接，那么时延和慢启动时延就会叠加起来。

![image-20190610162625465](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610162625465.png)

除了串行加载引入的实际时延之外，有些浏览器在对象加载完毕之前无法获知对象的尺寸，无法在屏幕上显示任何内容。这种时候串行装载对象的进度很正常，但是用户面对的却是一个空白的屏幕。

还有几种现存和新兴的方法可以提高 HTTP 的连接性能：

- 并行连接：通过多条 TCP 连接发起并发的 HTTP 请求；
- 持久连接：重用 TCP 连接，以消除连接及关闭时延；
- 管道化连接：通过共享的 TCP 连接发起并发的 HTTP 请求；
- 复用的连接：交替传送请求和响应报文（实验阶段）。

### 4.4 并行连接

HTTP 允许客户端打开多条连接，并行地执行多个 HTTP 事务。

![image-20190610163515829](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610163515829.png)

#### 4.4.1 并行连接可能会提高页面的加载速度

![image-20190610163553607](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610163553607.png)

#### 4.4.2 并行连接不一定更快

- 客户端的网络带宽不足，大部分的时间可能都是用来传送数据的；如果并行加载多个对象，每个对象都会去竞争这有限的带宽，每个对象都会以较慢的速度按比例加载，这样带来的性能提升就很小；
- 打开大量连接会消耗很多内存资源，从而引发自身性能问题。

实际上浏览器确实使用了并行连接，但是它们会将并行连接的总数限制为一个较小的值（通常是 4 个）。

#### 4.4.3 并行连接可能让人”感觉“更快一些

如题。

### 4.5 持久连接

非持久连接会在每个事务结束之后关闭，持久连接会在不同事务之间保持打开状态，直到客户端或者服务器决定将其关闭为止。持久连接降低了时延和建立连接的开销，将连接保持在已调谐状态，而且减少了打开连接的潜在数量。

#### 4.5.1 持久连接与并行连接

持久连接与并行连接配合使用可能是最高效的方式。现在，很多 Web 应用程序都会打开少量的并行连接，其中的每一个都是持久连接。持久连接有两种类型：比较老的 HTTP/1.0+ "keep-alive"连接，以及现代的 HTTP/1.1 "presistent"连接。

#### 4.5.2 HTTP/1.0+ keep-alive 连接

![image-20190610165450677](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190610165450677.png)

#### 4.5.3 Keep-Alive 操作

keep-alive 已经不再使用了，HTTP/1.1 规范中也没有对它的说明了。实现 HTTP/1.0 keep-alive 连接的客户端可以包含 Connection: Keep-Alive 首部请求将一条连接保持在打开状态。如果服务端愿意为下一条请求保持打开状态，就在响应中包含相同的首部，如果响应中没有，客户端就认为服务器不支持 keep-alive。

![image-20190611143314715](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190611143314715.png)

#### 4.5.4 Keep-Alive 选项

可以用 Keep-Alive 通用首部调节 keep-alive 的行为。

```bash
Connection: Keep-Alive
Keep-Alive: max=5, timeout=120
```

timeout 估计了服务器希望将连接保持在活跃状态的时间；max 估计了服务器希望为多少个事务保持此连接的活跃状态。这些都不是一个承诺值。

#### 4.5.5 Keep-Alive 连接的限制和规则

- HTTP/1.0 中，keep-alive 默认不使用，客户端必须发送 Connection: Keep-Alive 请求首部来激活 keep-alive 连接；
- 客户端通过响应报文中是否包含 Connection: Keep-Alive 首部就可以知道服务器发出响应之后是否关闭连接了；
- 只有无需检测连接关闭即可确认报文实体主体部分长度的情况下，才能将连接保持在打开状态，也就是说实体的主体部分必须有正确的 Content-Length；
- 对于代理和网关必须执行 Connection 首部的规则，并在转发之前，删除在 Connection 中命名的所有首部字段以及 Connention 首部自身；严格说不应该与无法确定是否支持 Connection 首部的代理服务器建立 keep-alive 连接，以防止哑代理；
- 除非重复发送请求会产生其他一些副作用，否则如果在客户端收到完整的响应之前连接就关闭了，客户端就一定要做好重试请求的准备。

#### 4.5.6 Keep-Alive 和哑代理

一些旧的代理不理解 Connection 首部，他们都是盲中继，只是将字节从一个连接转发到另一个连接中去，不对 Connection 首部进行特殊的处理。

![image-20190611144807253](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190611144807253.png)

比如这个过程：

- (a)中，客户端发送一个 keep-alive 请求，等待响应以确认对方是否认可它的持久连接请求；
- (b)中，哑代理收到了这条请求，但它并不理解 Connection 首部，只是透传给服务器；
- HTTP 请求抵达 Web 服务器，服务器收到 Connection: Keep-Alive 首部时，会误以为代理希望进行 keep-alive 对话，对于服务器而言，他同意了 keep-alive 对话，并回送了一个 Connection: Keep-Alive 响应首部；所以服务器以为它与代理正在进行 keep-alive 对话，而代理其实并不识别；
- 哑代理将服务器响应回送给客户端，并将 Connnection: Keep-Alive 首部一起传送过去，客户端看到这个首部，认为代理同意 keep-alive 对话，但其实，代理同样不识别；
- 由于代理不识别 keep-alive，所以它在转发完数据之后，一直等待服务器关闭连接，但是服务器认为代理已经显式地请求它将连接保持在打开状态，所以不会关闭连接。这样代理就会挂在那里等待连接的关闭；
- (d)中，客户端收到回送响应报文，会立即在 keep-alive 连接上向代理发送另一条请求，而代理并不认为同一条连接上会有其它请求，所以请求会被忽略，浏览器永远得不到响应；
- 这种错误的通信方式会使浏览器一直处于挂起状态，直到客户端或服务器将连接超时，并关闭为止。

为避免哑代理，现代的代理都绝不能转发 Connection 首部和所有名字出现在 Connection 值中的首部。

#### 4.5.7 插入 Proxy-Connection

思路是不使用 Connection 首部，而是自定义的 Proxy-Connection，聪明的代理可以理解这个首部并在转发的时候替换为 Connection，达到相同的效果。但是对于多层代理，哑代理问题依然存在。

![image-20190612095216763](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190612095216763.png)

#### 4.5.8 HTTP/1.1 持久连接

HTTP/1.1 逐渐停止了对 keep-alive 支持，用一种名为持久连接(persistent connection)的改进型取代了它。HTTP/1.1 中持久连接是默认激活的，需要应用程序显式地添加一个 Connection: close 首部，将连接关闭。

#### 4.5.9 持久连接的限制和规则

- 发送了 Connection: close 请求首部之后，客户端就无法在那条连接上发送更多请求；
- 只有实体主体部分的长度都和相应的 Content-Length 一致时，或者是用分块传输编码方式编码的，连接才能持久保持；
- HTTP/1.1 的代理服务器不应该与 HTTP/1.0 客户端建立持久连接；
- 不管 Connection 首部取什么值，HTTP/1.1 设备都可以在任意时刻关闭连接；
- 除非重复发起请求会产生副作用，否则如果在客户端收到完成响应之前连接关闭了，客户端就必须要重新发起请求；
- 一个用户客户端对任何服务器或代理最多只能维护两条持久连接，防止服务器过载。代理因为要支持用户的并发通信，所有如果有 N 个用户试图访问服务器的话，代理最多要维持 2N 条到任意服务器或父代理的连接。

### 4.6 管道化连接

HTTP/1.1 允许在持久连接上可选的使用请求管道。意思是在响应到达之前，剩余的请求也可以开始发送。在高时延网络条件下，这样做可以降低网络的环回时间，提高性能。

- 如果无法确定连接是否是持久的，就不应该使用管道；
- 必须按照与请求相同顺序回送 HTTP 响应；
- HTTP 客户端要做好连接会在任意时刻关闭的准备，还要准备好重发所有未完成的管道化请求；
- 不应该管道化的方式发送会产生副作用的请求，比如 POST。

![image-20190612101948958](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190612101948958.png)

### 4.7 关闭连接的奥秘

#### 4.7.1 ”任意“解除连接

所有 HTTP 客户端、服务器或代理都可以在任意时刻关闭一条 TCP 传输连接。

#### 4.7.2 Content-Length 及截尾操作

每条 HTTP 响应都应该有精确的 Content-Length 首部，用以描述响应主体的尺寸。当实际传输的实体长度与 Content-Length 不匹配时，接收端应该质疑长度的正确性。如果接收端是缓存代理，接收端就不应该缓存这条响应。代理应该原封不动地转发这条报文，而不是试图校正，以维护语义的透明性。

#### 4.7.3 连接关闭容限、重试以及幂等性

如果一个事务，不管执行一次还是很多次，得到的结果都相同，这个事务就是幂等的。可以认为除 POST 之前的方法都是幂等的。客户端不应该管道化非幂等请求。大多数浏览器都会在重载一个缓存的 POST 响应时，提供一个对话框，询问用户是否希望再次发起事务处理。

#### 4.7.4 正常关闭连接

![image-20190612104325289](/Users/wangyunfei/Library/Application%20Support/typora-user-images/image-20190612104325289.png)

TCP 连接是双向的，连接的每一端都有一个输入队列和一个输出队列，用于数据的读或写。

##### 1. 完全关闭与半关闭

输入与输出全关闭称为完全关闭，只关闭其中一个称为半关闭。

##### 2. TCP 关闭及重置错误

关闭连接的输出信道总是很安全的，关闭连接的输入信道比较危险。如果另一端向你已关闭的输入信道发送数据，操作系统就会向另一端的机器回送一条 TCP”连接被对端重置“的报文，大部分操作系统会认为这是很严重的错误，会删除还未读取的缓存数据。

##### 3. 正常关闭

HTTP 规范建议，当一端突然要关闭一条连接时，应该”正常地关闭传输连接“，但它并没有说明应该如何去做。

想要正常关闭连接的应用程序应该先半关闭其输出信道，然后周期性地检查其输入信道的状态。如果在一定时间区间内对端没有关闭输入信道，应用程序可以强制关闭连接，以节省资源。

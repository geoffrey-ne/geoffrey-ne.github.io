---
title: Javascript高级程序设计（第三版）
subtitle: Canvas绘图学习笔记
author: wangyunfei
date: 2019-10-23
tags: [fe, javascript]
---

`<canvas>`元素是 HTML5 才加入的。元素在页面中设定一个区域，然后通过 js 动态的绘制图形。

`<canvas>`支持基本的 2D 绘图，IE9+的浏览器都支持。还提供了一个`WebGL`的 3D 绘图上下文，但是支持的不够好。在旧的操作系统比如 XP，缺少必要的绘图驱动程序，即便安装了高版本的浏览器也不支持。

## 15.1 基本用法

```HTML
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>
```

```javascript
var drawing = document.getElementById('drawing')

// 确实是否支持canvas
if (drawing.getContext) {
  var context = drawing.getContext('2d')
}
```

`<canvas>`与普通元素一样都可以设置宽高及 css 样式。如需绘图，需要先通过`getContext()`方法取得绘图上下文对象。该方法接受上下文名字，传入"2d"就可以获得 2D 上下文对象。

使用`toDataURL()`方法可以导出绘制的图像。方法接受图像的 MIME 类型参数，比如：

```javascript
var imgURL = drawing.toDataURL('image/png')

var image = document.createElement('img')
image.src = imgURI
document.body.appendChild(image)
```

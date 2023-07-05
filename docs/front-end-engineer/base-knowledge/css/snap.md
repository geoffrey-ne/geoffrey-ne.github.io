# snap

## 高度自适应 + 滚动

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
  /* 高度根据需求自行设定 */
  height: 100%;
}
.child {
  position: absolute;
  /* left,top,right,bottom都为0，充满真个页面 */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /* 设置Y轴出现滚动条，X轴隐藏 */
  overflow-y: auto;
  overflow-x: hidden;
}
```

# flex 布局

flexbox 可以自动调整，计算元素在容器空间中的大小。

声明 flex 布局只需要使用`display: flex;`或者`display: inline-flex;`。

## flex 容器属性

`flex-direction || flex-wrap || flex-flow || justify-content || align-items || align-content`

### `flex-direction`

控制 flex 沿着主轴(Main Axis)的排列方向，默认为：`row`。`flex-direction: row || column || row-reverse || column-reverse;`

### `flex-wrap`

控制当容器一行不足以显示全部项目时，是否折行，默认为：`no-wrap`。`flex-wrap: wrap || nowrap || wrap-reverse;`

### `flex-flow`

是`flex-direction`和 `flex-wrap`两个属性的速记属性；

`flex-flow: row wrap;` 与 `flex-direction: row; flex-wrap: wrap;` 相同。

### `justify-content`

控制项目在`Main-Axis`上对齐方式。

`justify-content: flex-start || flex-end || center || space-between || space-around;`

- `flex-start`: 默认，Main-Axis 开始边缘（左对齐）；
- `flex-end`: Main-Axis 结束边缘（右对齐）；
- `flex-end`: Main-Axis 中间（居中对齐）；
- `space-between`: 除首尾两个项目，剩余项目间隔相同；
- `space-around`: 所有项目间隔相同，包括首尾两个；不过首尾距边缘的间距是距项目间距的一半；

### `align-items`

控制项目在`Cross-Axis`上对齐方式。

`align-items: flex-start || flex-end || center || stretch || baseline;`

- `stretch`：默认，让所有项目与 flex 容器高度一致；
- `flex-start`: Corss-Axis 开始边缘（顶部对齐）；
- `flex-end`: Corss-Axis 结束边缘（底部对齐）；
- `center`: Corss-Axis 中间（居中对齐）；
- `baseline`: 沿着自己的基线对齐；

### `align-content`

控制项目多行时的排列方式。

- `stretch`：默认，拉伸项目，让多行项目在 Cross-Axis 适应 Flex 容器可用的空间；
- `flex-start`：让多行项目在 Cross-Axis 开始边缘；
- `flex-end`：让多行项目在 Cross-Axis 结束边缘；
- `center`: 让多行项目在 Corss-Axis 中间（居中对齐）；

## flex 项目属性

`order || flex-grow || flex-shrink || flex-basis || align-self`

### `order`

在不改变 html 的前提下，控制 flex 项目的展示顺序。

所有项目默认 order 值均为 0，这意味着如果你只将其中一个项目的 order 设置为 1，无论有多少个项目他都将排在最后。

`li:nth-child(1) { order: 1; }`

### `flex-grow` 、 `flex-shrink` 和 `flex-base`

控制项目在有多余空间时如何放大(grow)，以及在没有额外空间时如何缩小(shrink)。

grow 默认为 0，代表关闭；shrink 默认为 1，代表打开。比如设置：`flex-grow: 1; flex-shrink: 1;`代表调整浏览器变大的时候，项目也会变大(打开了 grow)；调整浏览器变小的时候，项目也会在可能得情况下变小(打开了 shrink)。

如果设置 shrink 为 0，那么在浏览器变小的时候就不会再变小。

`flex-base`用户设置初始 flex 项目的大小，值可以是`width`的任何值，比如`% || em || rem || px`等。默认值为：`auto`。

以上三个属性可以使用`flex`简写。如：`flex: 0 1 auto;`，代表`flex-grow: 0; flex-shrink: 1; flex-base: auto;`，是所有配置的默认值。

注意，使用简写的时候，如果没有配置第三项(base)，则 base 默认为 0（不是 auto!）。

考虑`flex: 2 1 0;`。其意义与 `flex: 2;` 相同。

#### 多个项目上配置`grow`

到目前为止，我们仅使用`1`代表打开，其实可以使用任意正数来代表打开这项配置。那么正数的大小是否有意义呢？答案是肯定的，在多个项目配置 grow 的值时，其大小就代表了自动放大的比例。比如：

```css
li:nth-child(1): flex: 2 1 0;
li:nth-child(2): flex: 1 1 0;
```

这代表了列表的第一项的宽度是第二项宽度的二倍。

### align-self

与 `align-item` 和 `align-content`控制容器整体在 cross-axis 对齐方式不同，`align-self`用于控制单独项目的对齐方式。

```css
li:first-of-type {
  align-self: auto || flex-start || flex-end || center || baseline || stretch;
}
```

其值与`align-item || align-content`类似，只是影响当前项目，不再赘述。

## 参考文献

- [理解 Flexbox：你需要知道的一切](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)

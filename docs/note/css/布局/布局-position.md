# 布局-position

position 可以控制元素脱离文档流（`fixed`、`absolute`），实现特殊定位。

除了`static`属性值，position 的属性的设置，会将元素标记为`positioned`。这个标记代表此元素被特殊定位，其子节点如果也是特殊定位，将以这个节点的位置来计算相对位置。

## `position: static;`(默认值)

`static`表示元素不会被特殊定位，即不受`top`、`left`等位置属性影响。

## `position: relative;`

`relative`表示其子节点相对位置的计算不再以根节点为准，而是以此父节点位置为准。

除此之外，配置`relative`的节点，会受位置属性影响。但是其文档流的占位依然存在，其他元素不会受该元素位置的影响。

## `position: fixed;`

`fixed`表示固定位置，无论其父节点是否具有标记为`positioned`元素，其位置计算方式都是相对视窗而言的。

注：移动端对`fixed`属性支持很差。

## `position: absolute;`

`absolute`与`fixed`一样都是绝对定位。不同的是：`absolute`需要根据其最近的标记为`positioned`祖先，来计算其绝对定位的最终位置。

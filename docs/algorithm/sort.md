# 排序算法 js 实现

## 1. 插入排序

概述：

Insertion Sort 和打扑克牌时，从牌桌上逐一拿起扑克牌，在手上排序的过程相同。

举例：

Input: {5 2 4 6 1 3}。

首先拿起第一张牌, 手上有 {5}。

拿起第二张牌 2, 把 2 insert 到手上的牌 {5}, 得到 {2 5}。

拿起第三张牌 4, 把 4 insert 到手上的牌 {2 5}, 得到 {2 4 5}。

以此类推。

![快排](~@images/insertSort.gif)

- 最佳情况就是，数组已经是正序排列了，在这种情况下，需要进行的比较操作是 （n-1）次即可；
- 最坏情况就是，数组是反序排列，那么此时需要进行的比较共有 n(n-1)/2 次；
- 时间复杂度 O(n^2)；

```javascript
// 快排
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const value = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > value) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = value
  }
}
```

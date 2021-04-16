# 查找算法 js 实现

## 1. 二分法

算法：

初始化指针 left = 0, right = n - 1。

当 left <= right：比较中间元素 nums[pivot] 和目标值 target 。

- 如果 target = nums[pivot]，返回 pivot；
- 如果 target < nums[pivot]，则在左侧继续搜索 right = pivot - 1；
- 如果 target > nums[pivot]，则在右侧继续搜索 left = pivot + 1。

复杂度分析

- 时间复杂度：O(logN)。
- 空间复杂度：O(1)。

```javascript
// 二分查找
function search(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2) // 此处不用(left + right) / 2是防止溢出
    if (nums[middle] === target) {
      return true
    }
    if (target < nums[middle]) {
      right = middle - 1
    } else {
      left = middle + 1
    }
  }
  return false
}
```

# 单调栈 - monotone stack

单调栈的定义很简单，在栈`先进后出`特性的基础之上，额外添加一个特性：从栈顶到栈底的元素是严格递增或递减的。

## 示例

来看一个的示例：假设输入数据为：`[5, 3, 1, 2, 4]`，我们想要得到一个看起来是单调递减的栈，操作顺序是什么样的呢？

- 初始栈为空，`5`直接进栈。此时的栈为：`[5]`；
- `3`小于`5`，所以可以直接进栈。此时的栈为：`[5, 3]`；
- `1`小于`3`，所以可以直接进栈。此时的栈为：`[5, 3, 1]`；
- `2`大于`1`，**当遇到不符合单调性的数字时，我们需要依次弹出栈内元素，直到满足单调性为止**：
  - `2`大于`1`，所以弹出`1`；此时的栈为：`[5, 3]`；
  - `2`小于`3`，所以`2`可以直接进栈。此时的栈为：`[5, 3, 2]`；
- `4`大于`2`，所以弹出`2`；此时的栈为：`[5, 3]`；
- `4`大于`3`，所以弹出`3`；此时的栈为：`[5]`；
- `4`小于`5`，所以`4`可以直接进栈。此时的栈为：`[5, 4]`；

至此所有操作都完成了。让我们做一道习题找找感觉。

## 习题 1

还是数组`[5, 3, 1, 2, 4]`，现在我想知道数组中每一个元素至少要向右查找多少次，能找到比自己大的数，如果不存在则返回-1，返回结果数组。

比如本题中

- `5`，没有比 5 更大的数字，所以第一个结果为`-1`
- `3`，向右查找到`4`为第一个比`3`大的数字，所以结果为`3`，代表向右查找了`3`次
- `1`，向右查找到`2`为第一个比`1`大的数字，所以结果为`1`，代表向右查找了`1`次
- 以此类推

结果返回：`[-1, 3, 1, 1, -1]`，让我们看看代码实现：

```javascript
// 单调栈
function nextExceed(inputs) {
  const result = Array(inputs.length).fill(-1)
  const monoStack = []
  for (let i = 0; i < inputs.length; i++) {
    let monoStackTop
    while (
      monoStack.length > 0 &&
      ((monoStackTop = monoStack[monoStack.length - 1]), inputs[monoStackTop] < inputs[i])
    ) {
      result[monoStackTop] = i - monoStackTop
      monoStack.pop()
    }
    monoStack.push(i)
  }
  return result
}
console.log(nextExceed([5, 3, 1, 2, 4])) // [-1, 3, 1, 1, -1]
```

解读：

- 初始化 result 值均为-1，默认为未找到比自己大的数字；
- 当数字在依次递减（因为题目要找到第一个比当前元素大的数字，所以我们保存的时候选择依次递减）的时候，直接将当前**索引值**存到我们的单调栈中；
- 遇到了比自己大的数字，符合条件（**当遇到不符合单调性的数字时**），更新此时的 result 为 i - 保存的索引值；
- 因为找到了结果所以从栈中将弹出，继续循环判断栈顶元素，直到再次满足时，入栈当前索引值；
- 循环结束后，result 即为更新后的最终结果。

是不是稍微有点感觉了？让我们再做做题，继续找感觉。

## 习题 2

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums, maps = []) {
  const len = nums.length
  if (len < 3) {
    return false
  }

  const mins = new Array(len)
  mins[0] = nums[0]
  for (let i = 1; i < len; i++) {
    mins[i] = Math.min(mins[i - 1], nums[i])
  }

  const monoStack = []
  for (let i = len - 1; i > 0; i--) {
    if (nums[i] > mins[i]) {
      const monoStackTop = monoStack[monoStack.length] - 1
      // 单调栈顶元素不大于最小值
      while (monoStack.length > 0 && monoStackTop <= mins[i]) {
        monoStack.pop()
      }
      // 单调栈顶元素比当前元素小
      if (monoStack.length > 0 && monoStackTop < nums[i]) {
        return true
      }
      monoStack.push(nums[i])
    }
  }
  return false
}
// nums = [3, 5, 0, 3, 4]
// mins = [3, 3, 0, 0, 0]

- nums[4] > mins[0]，monoStack = [4]
- nums[3] > mins[3]，monoStack = [4, 3]
- nums[2] === mins[2]，什么都不做
- nums[1] > mins[1]，monoStackTop = 3，

```

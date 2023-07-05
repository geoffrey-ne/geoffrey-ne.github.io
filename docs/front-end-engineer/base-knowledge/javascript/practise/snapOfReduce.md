# 觉得比较优雅的 reduce 用法

```javascript
// from: https://github.com/webpack/webpack/blob/main/lib/util/ArrayHelpers.js

/**
 * 根据fn将数组arr分为两组
 *
 * @param {Array} arr Array of values to be partitioned
 * @param {(value: any) => boolean} fn Partition function which partitions based on truthiness of result.
 * @returns {[Array, Array]} returns the values of `arr` partitioned into two new arrays based on fn predicate.
 */
exports.groupBy = (arr = [], fn) => {
  return arr.reduce(
    (groups, value) => {
      groups[fn(value) ? 0 : 1].push(value)
      return groups
    },
    [[], []],
  )
}
```

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


function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
// 先点三次click me，再点一次show alert，再点两次click me，alert了什么

function a() {
  var n = 9

  function add () {
    console.log(n++)
  }

  return {
    n: n,
    add: add
  }
}

var t1 = a()
console.log(t1.add())

var t2 = a()
console.log(t2.add())
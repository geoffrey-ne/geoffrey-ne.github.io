# JavaScript 常见手写代码问题

## 防抖与节流

```javascript
// 防抖 debounce: 无论调用频率多高，一定在触发delay秒后执行
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流 throttle: 无论调用频率多高，只在单位时间执行一次
function throttle(fn, delay) {
  let preTime = +new Date()
  return function(...args) {
    const now = +new Date()
    if (now - preTime > delay) {
      preTime = now
      fn.apply(this, args)
    }
  }
}
```

## 浅拷贝与深拷贝

```javascript
// 浅拷贝
function shadowCopy(obj) {
  const newObj = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 深拷贝
function deepCopy(obj) {
  if (!(typeof obj === 'object' && obj !== null)) {
    return obj
  }
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}

// 深拷贝复杂版
function deepCopy(obj, cache = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  if (obj === null || typeof obj !=== 'object') return obj

  if (cache.has(obj)) {
    return cache.get(obj)
  }

  const res = new obj.constructor();
  cache.set(obj, res)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepCopy(obj[key], cache)
    }
  }
  return res
}

```

## 数组乱序

```javascript
// 使用sort有问题，当目标数组长度小于10时，使用插入排序；反之，使用快速排序。
// 排序算法的使用使得并不是所有元素都得到等概率的比较
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5)
}

// Fisher–Yates
function shuffle2(arr) {
  let i = arr.length
  while (i > 1) {
    const j = Math.floor(Math.random() * i--)
    [arr[j], arr[i]] = [arr[i], arr[j]])
  }
  return arr
}
```

## 数组去重

```javascript
// 数组去重
function removeDuplicates(arr) {
  const res = []
  const map = {}
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      map[arr[i]] = true
      res.push(arr[i])
    }
  }
  return res
}

// 使用set版
;[...new Set(arr)]
Array.from(new Set(arr))
```

## 数组扁平化

```javascript
// 数组扁平化
function flattern(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      res.push(arr[i])
    } else {
      res = res.concat(flattern(arr[i]))
    }
  }
}

// reduce
function flatten2(arr) {
  return arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? flatten2(next) : next), [])
}
```

## 数组过滤(filter)

```javascript
Array.prototype.filter = function(fn, thisArg) {
  const res = []
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i, this)) {
      res.push(this[i])
    }
  }
  return res
}
```

## 实现 call & apply & bind

```javascript
Function.prototype.myCall = function(context) {
  context = context || window
  context.fn = this

  let arr = []
  for (let i = 1; i < arguments.length; i++) {
    arr.push(`arguments[${i}]`)
  }

  const res = eval(`context.fn(${arr})`)
  delete context.fn
  return res
}

Function.prototype.myApply = function(context) {
  context = context || window
  context.fn = this

  let arr = []
  const args = arguments[1] || []
  for (let i = 0; i < args.length; i++) {
    arr.push(`args[${i}]`)
  }

  const res = eval(`context.fn(${arr})`)
  delete context.fn
  return res
}

Function.prototype.myBind = function(context) {
  const fn = this
  const args = [...arguments].slice(1)
  context = context || window
  return function() {
    if (this instanceof fn) {
      return new fn(...args, ...arguments)
    }
    return fn.apply(context, args.concat(...arguments))
  }
}
```

## 实现 sleep

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
```

## 实现 new

```javascript
function myNew() {
  const constructor = [].shift.apply(arguments)
  const obj = Object.creat(constructor.prototype)
  const res = constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}
```

## 实现 instanceof

```javascript
function instanceOf(left, right) {
  let leftProto = left.__proto__
  while (leftProto) {
    if (leftProto === right.prototype) {
      return true
    }
    leftProto = leftProto.__proto__
  }
  return false
}
```

## 实现 Object.create

```javascript
function myCreate(proto) {
  // 这里不使用__proto__，是因为__proto__可能不存在
  function F() {}
  F.prototype = proto
  return new F()
}
```

#### Object.create 原理

```js
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

#### fetch

```js
/**
 * 创建一个handlerFetch
 *
 * @param {limit，timeout} limit 为并发控制 timeout为超时设定
 * @return function 返回一个函数
 */
function handlerFetch(limit, timeout) {
  limit = limit || 1
  timeout = timeout || 0
  var count = 0,
    pool = []
  return function(url, options) {
    // 通过AbortController 控制 取消fetch 请求
    var controller = new AbortController()
    var signal = controller.signal
    // 判断是否需要超时
    var isTimeout = (options && options.timeout) || timeout
    // 控制请求超时
    var timeoutPromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            resolve('请求超时')
            controller.abort()
          },
          options && options.timeout !== undefined ? options.timeout : timeout,
        )
      })
    }
    // 返回fetch 本身
    var taskPromise = () =>
      new Promise((resolve, reject) => {
        fetch(url, { signal, ...options })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    // 通过Promise.race可以控制超时，并在访问结果中 去继续调用等待池中的请求
    var task = () =>
      (isTimeout ? Promise.race([timeoutPromise(), taskPromise()]) : taskPromise())
        .then(res => {
          console.log('res', res)
          next()
        })
        .catch(err => {
          next()
          console.log('err', err)
        })

    // 定一个next 控制等待队列中的请求继续并发调用
    var next = () => {
      // 每执行一次next count - 1，然后比较当前的count 与 limit
      // 如果小于limit 循环执行limit-count 次
      count--
      if (count < limit && pool.length) {
        var n = limit - count
        for (var i = 0; i < n; i++) {
          var curTask = pool.shift()
          curTask()
          ++count
        }
      }
    }
    // 比较count与limit 大于等于limit的推入等待队列 小于limit的 count + 1，并执行fetch请求
    if (count >= limit) {
      pool.push(task)
    } else {
      ++count
      task()
    }
  }
}
```

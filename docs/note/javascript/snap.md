# snap

## Conditionally Add Properties to Object

```javascript
const condition = true
const person = {
  id: 1,
  name: 'John Doe',
  ...(condition && { age: 16 }), // spreading false has no effect on the object
}
```

## 兼容未定义的数组或对象

```javascript
;(obj[key] || obj[key] = []).push(something)
;(obj[key] || obj[key] = {})[prop] = 'something'
```

## `[Symbol.iterator]`自定义迭代器

```javascript
const range = (start = 0, stop, step = 1) => {
  if (stop === undefined) {
    ;[start, stop] = [0, start]
  }

  start -= step
  return {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: (start += step),
        done: start >= stop,
      }),
    }),
  }
}

console.log([...range(1, 10)]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log([...range(0, 10, 2)]) // [0, 2, 4, 6, 8]

Number.prototype.to = stop => range(this, stop)
console.log([...(1).to(10)]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

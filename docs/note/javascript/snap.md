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

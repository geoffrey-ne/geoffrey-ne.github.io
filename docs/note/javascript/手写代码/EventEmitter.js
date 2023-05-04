class EventEmitter {
  constructor() {
    // ...
  }
  on() {
    // ...
  }
  emit() {
    // ..
  }
  once() {
    // ...
  }
  off() {
    // ...
  }
}

// 运行示例
const event = new EventEmitter()

event.on('someevents', function(str) {
  console.log(str)
})

event.once('someevents', function(str) {
  console.log('这是once:' + str)
})

event.emit('someevents', 'good1')
event.emit('someevents', 'good2')

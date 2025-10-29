# redux中的三个核心概念


## 为什么需要redux

js开发的应用程序，已经变得越来越复杂了：

- js需要管理的状态越来越多，越来越复杂
- 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等，也包括一些ui的状态，比如某些元素是否被选中，是否显示加载动效，当前分页

管理不断变化的state是非常困难的

- 状态之间互相会存在依赖，一个状态的变化会引起另一个状态的变化，view页面也可能会引起状态的变化
- 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控制和追踪

react是在视图层帮我们解决了dom的渲染过程，但是state依然是留给我们自己来管理

```jsx
// React
UI = render(state)
```

**redux就是一个帮助我们管理state的容器：redux是js的状态容器，提供了可预测的状态管理**

- redux除了和react一起使用之外，它也可以和其他页面库一起来使用（比如Vue），并且它非常小



## redux的核心理念

### Store

- 存数据



### action

redux要求我们通过action更新数据

- 所有数据的变化， 必须通过派发（dispatch）action来更新
- action是一个普通的js对象，用来描述这次更新的type和content

强制使用action可以清晰的知道数据到底华沙嗯了什么样的变化，所有的数据变化都是可追踪、可预测的

真实应用中，我们能会通过函数来定义，返回一个action



### reducer

如何将state和action联系在一起呢？答案就是reducer

- reducer是一个纯函数
- reducer做的事情就是将传入的state和action结合起来生成一个新的state

> 不是把原来的state改掉，而是生成一个新的state，因为它是一个纯函数，没有副作用



当你在 Redux 中调用 `dispatch(action)` 时，Store 内部会自动：

1. **调用当前的 reducer 函数**
2. **传入当前的 state 和 action**
3. **用返回的新 state 替换旧的 state**



## 订阅store中的数据

- **订阅**就是：**当 Redux Store 中的状态发生变化时，自动通知你**。

  就像你订阅了报纸，报社每次出新报纸就会自动送到你家一样。

- 使用store.subscribe()来订阅store中的状态，括号内的内容就是在状态发生变化时自动调用的
- 并且这个方法返回一个取消订阅函数，调用该函数即可取消订阅

```js
const store = require("./store")

// store的subscribe方法返回一个取消订阅函数，调用即可取消订阅
const unsubscribe = store.subscribe(() => {
  console.log("订阅数据的变化", store.getState())
})

// 取消订阅
unsubscribe()
```


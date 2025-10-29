# react-redux

```bash
npm install react-redux
```

## connect函数

- connect() 的返回值是一个高阶组件
- mapStateProps函数的目的是映射state中我们需要的数据，返回一个对象
- 不再需要再单个小的组件内部引入store，以及进行其他繁琐的操作



### 第一步：提供store（对整个App）

```js
// index.js
...
import store from './store';
...
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 第二步：封装函数及映射

```jsx
import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import actionCreators from "../store/actionCreators"


export class About extends PureComponent {

  calcNumber(num, isAdd) {
    if (isAdd) {
      this.props.addNumber(num)
    } else {
      this.props.subNumber(num)
    }
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>About Page: { counter }</h2>
        <div>
          <button onClick={e => this.calcNumber(3, true)}>+3</button>
          <button onClick={e => this.calcNumber(18, true)}>+18</button>
          <button onClick={e => this.calcNumber(10, false)}>-10</button>
        </div>
      </div>
    )
  }
}

// connect()返回值是一个高阶组件

// mapStateToProps函数的目的是映射state中我们需要的数据，返回一个对象
const mapStateToProps = (state) => ({
  counter: state.counter
})


// mapStateToProps函数的目的是映射dispatch
const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(actionCreators.addNumberAction(num))
  },
  subNumber(num) {
    dispatch(actionCreators.subNumberAction(num))
  }
})

// connect函数接受两个参数，一个映射state，一个映射dispatch
// 然后就不需要再在这个组件中导入store了
export default connect(mapStateToProps, mapDispatchToProps)(About)
```



## connect 的三大好处

### 1. **自动订阅**

- 组件自动监听 Store 变化
- 状态更新时自动重新渲染
- 组件卸载时自动取消订阅

### 2. **依赖注入**

- 组件通过 props 获取状态和方法
- 组件不直接依赖 Store，更纯净
- 便于测试和复用

### 3. **性能优化**

- 自动进行浅比较，避免不必要的渲染
- 只在你需要的状态变化时才更新

## 现代写法

现代写法并不是用connect，而是用React Hooks
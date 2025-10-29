## react更新机制

react渲染流程：

JSX -> 虚拟DOM -> 真实DOM

react更新流程：

props/state改变 -> render函数重新执行 -> 产生新的DOM树 -> 新旧DOM树进行diff -> 计算出差异进行更新 -> 更新到真实的DOM



## react diff算法

在 React 中，当组件的状态或属性发生变化时，组件会重新渲染（即调用 `render` 方法），返回一个新的虚拟 DOM 树。React 需要找出新树和旧树之间的差异，然后以最高效的方式将这些差异更新到真实的 DOM 上。

这个“找出差异”的过程，就叫做 **协调**，而其中核心的对比算法就是 **Diff 算法**。

它的目标是：**在 O(n) 的时间复杂度内，完成两棵树的对比**。

- 当发现同一个 `key` 的节点时，会将其视为可复用的节点，可能只需要移动位置。
- 当发现新的 `key` 时，创建新节点。
- 当发现旧的 `key` 在新列表中不存在时，删除旧节点。

这个过程只需要对新旧两个列表各遍历一次（可能还需要一个由旧节点 key 生成的 Map 来辅助查找），所以是 **O(新列表长度 + 旧列表长度)**，即 **O(n)**。

key的注意事项：

- key应该是唯一的
- key不要使用随机数（随机数在下一次render时，会重新生成一个数字）
- 使用index作为key，对性能是没有优化的（只是为了消除警告有时会使用index作为key）





## shouldComponentUpdate (SCU)

- 这是react提供的一个生命周期方法，接收参数，并且需要有返回值

- 有两个参数：nextProps和nextState
- 返回值是一个布尔值
  - 返回值为true，那么就需要调用render方法
  - 返回值为false，那么就不需要调用render方法
  - 默认返回的是true，也就是只要state发生改变，就会调用render方法



### SCU优化

可以通过在SCU中对数据的改变进行判断，减少render方法的调用，以此实现优化

即：

```jsx
shouldComponentUpdate(nextProps) {
    if (this.props.counter !== nextProps.counter) {
        return true
    }
    return false
}
```

#### PureComponent

react已经考虑到了这一点，所以已经默认帮我们实现好了

要实现上面一样的优化，只需要做一个更改：

```jsx
import React, { PureComponent } from 'react'

export class App extends PureComponent {
	...
}
```

**只需将class继承自PureComponent**

若安装了ES7+ React/Redux/React-Native snippets这个插件，那么可以直接在空白文件里输入**rpce**来快捷创建组件

但是如果是函数式组件呢？

#### memo

函数式组件想要实现SCU优化使用的是mome

例子：

```jsx
import { memo } from 'react'

const Profile = memo(function(props) {
    console.log('profile render')
    return <h2>Profile: {props.message}</h2>
})

export defualt Profile
```

#### 关键注意事项（共同的陷阱）

两者都使用**浅比较**，这是它们高效的原因，但也带来了一个常见的陷阱：

**如果传递了引用类型（如对象、数组、函数）作为 props，并且它们在每次父组件渲染时被重新创建，浅比较会失败，导致子组件不必要的重新渲染。**



## 不可变的力量

**不可变数据** 指的是一旦创建，就**不能被修改**的数据。如果你想更新它，你不能直接去“改变”它，而是必须**创建一个新的、更新后的副本**来替换它。

在 JavaScript 中：

- **基本类型**（string, number, boolean, null, undefined, symbol, bigint）天生就是**不可变的**。

- **引用类型**（object, array, function）是天生的**可变的**，这也是问题的根源。

React 需要知道什么时候应该重新渲染一个组件。它通过**浅比较**来判断状态或属性是否发生了变化。

- **对于状态（State）**：`setState` 或 `useState` 的 setter 函数在接收到**相同的内存地址（引用）** 时，会认为状态没有变化，从而**跳过该组件及其子组件的重新渲染**。
- **对于属性（Props）**：`React.memo` 包装的组件或 `PureComponent`，会对 props 进行浅比较。

### 如何实践不可变更新？

对于对象和数组，不能使用 `=`、`.push`、`.pop`、`obj.key = value` 等直接修改的方法。

使用扩展运算符或 `Object.assign`。

例子：

```jsx
...
constructor() {
    super()
    this.state = {
        books: [
            {...},
            {...}
        ]
    }
}

addNewBook() {
    const newBook = { name:"React高级设计", price: 88, count: 1 }
    const books = [..this.state.books]
    books.push(newbook)
    
    this.setState({ books: books })
}
...
```



 

# ref获取dom

在react中，通常不建议直接操作dom原生，但是某些特殊情况，确实需要：

- 管理焦点，文本选择，媒体播放
- 触发强制动画
- 集成第三方dom库

**我们可以通过refs获取DOM**

- 方式一：在React元素上绑定一个ref字符串（不常用）
- 方式二：提前创建好ref对象，createRef()，将创建出来的对象绑定到元素
- 方式三：传入一个回调函数，在对应的元素被渲染之后，对调函数被执行，并将元素传入

例子：

```jsx
import React, { PureComponent, createRef } from 'react'

export class App extends PureComponent {
  constructor() {
    super()

    this.titleRef = createRef()
    this.titleEl = createRef()
  }

  getNativeDom() {
    console.log(this.titleRef.current)
    console.log(this.titleEl)
  }

  render() {
    return (
      <div>
        <h2 ref={this.titleRef}>hello lwt</h2>
        <h2 ref={el => this.titleEl = el}>hello lwt</h2>
        <button onClick={e => this.getNativeDom()}>获取dom</button>
      </div>
    )
  }
}

export default App
```

 

# 使用ref获取组件

- ref不能应用于函数式组件，因为函数式组件没有实例
- 可以绑定类组件

```jsx
import React, { PureComponent, createRef } from 'react'

class Helloworld extends PureComponent {
  render() {
    return <h1>Helloworld</h1>
  }
}

export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef()
  }

  getComponent() {
    console.log(this.hwRef.current)
  }

  render() {
    return (
      <div>
        <Helloworld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App
```



## ref的转发（获取函数式组件）

#### 应当通过forwardRef高阶函数

标准做法如下：

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react'

const Helloworld = forwardRef(function(props, ref) {
  return <h1 ref={ref}>Helloworld</h1>
})

export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef()
  }

  getComponent() {
    console.log(this.hwRef.current)
  }

  render() {
    return (
      <div>
        <Helloworld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App
```


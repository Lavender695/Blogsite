# Portals和Fragment

## Portals的使用

- 某些情况下，我们希望渲染的内容独立于父组件，甚至是独立于当前挂载到的dom元素中（默认都是挂在到id为root的dom元素上的）
- portal提供了一种将子节点渲染到任何存在于父组件以外的dom节点的优秀的方案：
  - 第一个参数（child）是任何可渲染的react子元素，例如一个元素，字符串或fragment
  - 第二个参数（container）是一个dom元素

例子：

```jsx
import React, { PureComponent } from 'react'
import { createPortal } from "react-dom"

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>App h1</h1>
        {
          createPortal(<h2>App h2</h2>, document.querySelector("#lwt"))
        }
      </div>
    )
  }
}

```



## fragment

- 在之前，我们总是在一个组件中返回内容时包裹一个div元素
- 我们又希望可以不渲染这样一个div应该如何操作呢？
  - 使用fragment
  - fragment允许你将子列表分组，而无需向dom添加额外节点

> 和vue中的template很像

例子：

```jsx
import React, { PureComponent, Fragment } from 'react'

export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <h1>App h1</h1>
        <h2>hello</h2>
      </Fragment>
    )
  }
}

```

语法糖：

```jsx
<>
	<h1>App h1</h1>
	<h2>hello</h2>
</>
```

在有key的情况下不能省略Fragment，只能写完整
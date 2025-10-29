# css in js

"css in js"是指一种模式，其中csss由js生成而不是在外部文件中定义

注意这个功能不是react的一部分，而是由第三方提供

css in js的模式就是一种将样式（css）也写入到js中的方式，并且可以方便的使用js的状态

所以react又被称之为all in js

## 认识styled-components

- css in js通过js来为css赋予一些能力，包括类似于css预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等
- 虽然css预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点

目前比较流行的css in js的库有哪些？

- styled-components
- emotion
- glamorous

**目前styled-components依然是社区最流行的css in js库**

## 安装styled-components

```bash
npm install styled-components
```



## 使用styled-components

例子：

```js
// style.js
import styled from 'styled-components'

export const AppWrapper = styled.div`
  .title {
    color: pink;
    font-size: ${props => props.size};   // 接收数据并使用
  }
  .content {
    color: ${props => props.color};
    font-size: 20px;
  }
`
```

```jsx
// App.jsx
import React, { PureComponent } from 'react'
import { AppWrapper } from './style'

export class App extends PureComponent {
  constructor() {
    super() 

    this.state = {
      color: "purple",
      size: "40px"
    }
  }

  render() {
    const { color, size } = this.state

    return (
      <AppWrapper color={color} size={size}>   // 传入数据
        <h2 className='title'>Title</h2>
        <p className='content'>Content</p>
      </AppWrapper>
    )
  }
}

export default App
```

> 可以下载一个vscode-styled-components的插件，在js文件里面写css的时候就有提示了

### props、attrs属性

#### props属性

- props可以被传递给styled组件
  - 获取props需要哦通过${}传入一个插值函数，props会作为该函数的参数
  - 这种方式可以有效地解决动态样式的问题
- （具体用法见上文例子）

#### attrs属性

- atters属性中可以设置默认值，当props没有传入这个数据的时候就会使用默认值

例子：
```js
import styled from 'styled-components'

export const AppWrapper = styled.div.attrs(props => ({
  $titleSize: props.size? props.size : 50
}))`
  .title {
    color: pink;
    font-size: ${props => props.titleSize}px;
  }
  .content {
    color: ${props => props.color};
    font-size: 20px;
  }
`
```
- titleSize前面加$是为了让styled-components知道这个属性不应该传递给dom，这是一个自定义的属性



当变量多的时候，可以单独建一个style/variables.js文件，专门编写变量

然后用的时候可以引入需要的变量

例子：

```js
// style/variables.js
export const primaryColor = 'red'
export const secondColor = 'pink'

export const smallSize = "12px"
export const middleSize = '14px'
export const largeSize = '18px'
```

```js
// style.js
import styled from "styled-components"
import {
    primaryColor,
    secondColor,
    largeSize
} from "./style/variables"

...
```


# css modules

css modules并不是react特有的解决方案，而是所有使用了类似于webpack配置的环境下都可以使用的

- 如果在其他项目中使用它，那么我们需要自己来进行配置，比如配置webpack.config.js中的modules: true等

react脚手架已经内置了css modules的配置

- **.css/.less/.scss等样式文件都需要修改成.module.css/.modules.less/.modules.scss等**
- 之后就可以引用并且使用了

> 这种方法比较麻烦，但是还是有很多人会这样去写

css modules的确解决了局部作用域的问题，也是很多人喜欢的一种方案

但是这种方案也有缺陷：

- 引用的类名，**不能使用连接符（.home-title）**，在js中是不识别的
- 所有的className都必须使用（style.className）的形式来编写
- 不方便动态来修改某些样式，依然需要使用内联样式的方式

例子：

```jsx
import React, { PureComponent } from 'react'
// import "./App.css"
import lwtStyle from "./App.module.css"

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className={lwtStyle.title}>title</h2>
        <p className={lwtStyle.content}>content</p>
      </div>
    )
  }
}

export default App
```

如果认为以上的缺陷还算可以接受，那么可以选择css modules
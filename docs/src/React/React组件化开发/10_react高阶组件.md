# react高阶组件

## 高阶组件的定义方式和作用

> 在学习了hooks之后这个用的很少了

### 认识高阶函数

- 接受一个或多个函数作为输入
- 输出一个函数

js中比较常见的filter、map、reduce都是高阶函数

### 什么是高阶组件

- 英文是Higher-Order Components，简称HOC
- 官方的定义：高阶组件时参数为组件，返回值为新组件的函数

**所以高阶组件实际上是一个函数**

- 高阶组件的调用过程类似于这样：

```jsx
const EnhancedComponent = higherOrderComponent(WrapperComponent)
```

- 高阶函数的编写过程类似于这样：

```jsx
function higherOrderComponent(WrapperComponent) {
	class NewComponent extends PureComponent {
		render() {
			return <WrapperComponent/>
        }
    }
    NewComponent.displayName = "CoderWHy";
    return NewComponent;
}
```

- 组件的名称都可以通过displayName来修改
- 高阶组件并不是react api的一部分，他是基于react的组合特性而形成的设计模式
- 高阶组件在一些react第三方库中非常常见

## 高阶组件 + Context的实际应用

- 用户认证注入
- 主题切换
- 等等

例子（主题切换）：

```jsx
// App.js
import React, { PureComponent } from 'react'
import ThemeContext from './context/theme_context'
import Product from './pages/Product'

export class App extends PureComponent {
  render() {
    return (
      <div>
        <ThemeContext.Provider value={{color: "red", size: 30}}>
          <Product/>
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default App
```

```jsx
// context/theme_context.js
import { createContext } from "react";

const ThemeContext = createContext()

export default ThemeContext
```

```jsx
// context/hoc/with_theme.jsx
import ThemeContext from "../theme_context"

function withTheme(OriginComponent) {
  return (props) => {
    return (
      <ThemeContext.Consumer>
        {
          (theme) => {
            return <OriginComponent {...props} theme={theme}></OriginComponent>
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

export default withTheme
```

```jsx
// pages/Product.jsx
import React, { PureComponent } from 'react'
import withTheme from '../context/hoc/with_theme'

export class Product extends PureComponent {
  render() {
    const { theme } = this.props

    return (
      <div>Product: {theme.color}-{theme.size}</div>
    )
  }
}

export default withTheme(Product)
```

**其本质就是通过增强组件的方式，将theme信息传递给组件，然后再在组件中使用传进来的props**



#### HOC也有自己的一些缺陷

- HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难
- HOC可以劫持props，在不遵守约定的情况下也可能造成冲突

**Hooks的出现，是开创性的，它解决了很多React之前存在的问题**
- 比如this指向问题、比如HOC的嵌套复杂度问题等等



## ref的转发

- 前面我们学习ref的时候讲，ref不能应用于函数式组件：
  - 因为函数式组件没有实例，所以不能获取到对应的组件对象
- 但是在开发中，我们可能想要获取函数式组件中某个元素的dom，这个时候应该如何操作呢？
  - 方式一：直接传入ref属性（错误的做法）
  - 方式二：通过forwardRef高阶函数（接受一个组件，返回一个组件）

```jsx
const Home = forwardRef(function(props, ref) {
    return (
        <div>
            <h2 ref={ref}>Home</h2>
            <button>按钮</button>
        </div>
    )
})
```


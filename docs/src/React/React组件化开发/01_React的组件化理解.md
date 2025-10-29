# React的组件化

React的组件相对于vue更加的灵活和多样，按照不同的方式可以分为很多类组件

- 根据组件的**定义方式**，可分为：函数组件( Functional Component )和类组件( Class Component )

```js
// 类组件
class App extends React.Component {
    
}

// 函数组件
funcion App() {
    
}
```

一般情况下问到组件的分类，就是函数组件和类组件，但是其他分类也需要了解



- 根据组件内部**是否有状态需要维护**，可以分为：无状态组件( Stateless Component )和有状态组件( Stateful Component )

> 一般认为函数组件是无状态组件，类组件是有状态组件
>
> 但是类组件在没有自己状态的情况下也可以称为无状态组件



- 根据组件的**不同职责**，可以分为：展示类组件( Presentational Component )和容器型组件( Container Component )



> 还有很多组件的其他概念：比如异步组件、高阶组件等





# 类组件

## 类组件定义的要求

- 组件的名称是大写字符开头（无论类组件还是函数组件）
- 类组件需要继承自React.Component
- 类组件必须实现render函数

**使用class定义一个组件：**

- constructor是可选的，我们通常在constructor中初始化一些数据 
- this.state中维护的就是我们组件内部的数据
- **render()**方法是class组件中**唯一必须实现的方法**



## render函数的返回值

当render被调用时，它会检查this.props和this.state的变化并返回以下类型之一：

- React元素：
  - 通常通过jsx创建
  - 例如，`<div/>`会被react渲染为dom节点，`<MyComponent/>`会被react渲染为自定义组件
  - 两者均为react元素

- 数组或fragments：使得render方法可以返回多个元素
- Portals：可以渲染子节点到不同的dom子树中

- 字符串或数值类型：它们在dom中会被渲染为文本节点

- 布尔类型或null：什么都不渲染



# 函数组件

函数组件是使用function来进行定义的函数，只是这个函数会**返回和类组件中render函数返回一样的内容**



函数组件有自己的特点（和hook不一样）

- 没有生命周期，也会被更新并挂载，但是没有生命周期函数
- this关键字不能指向组件实例（因为没有组件实例）
- 没有内部状态（state）



定义一个函数组件：

```jsx
export default function App() {
    return (
    	<div>Hello Liwenting</div>
    )
}
```


# react的插槽实现方式

在开发中，我们抽取了一个组件，但是为了让这个组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等元素

我们应该让使用者可以决定某一块区域到底存放什么内容

这种需求在vue中有一个固定的做法是通过slot来完成的

react对于这种需要插槽的情况非常灵活，有两种方案实现：

- 组件的children元素
- props属性传递react元素



## 插槽实现方式一：children

- 在组件的**双标签里面**放东西

- 每个组件都可以获取到props.children：它包含组件的开始标签和结束标签之间的内容
- 里面放了多个，那么是装在children**数组**中的
- 如果只放了一个，那么**就是这个children元素**，不是一个元素数组

```jsx
...
render() {
	return (
    	<NavBar>
        	<button>按钮</button>
            <h2>我是标题</h2>
            <i>斜体文字</i>
        </NavBar>
    )
}
...
```

```jsx
...
render() {
	const { children } = this.props
    
    return {
          <div className="left">{children[0]}</div>
          <div className="center">{children[1]}</div>
          <div className="right">{children[2]}</div>
    }
}
...
```



## 插槽实现方式二：props

- 第一种方法有一定弊端，因为无法确定children是一个元素还是一个数组，有一些不可控
- 一般推荐使用这一种方案

```jsx
<Banner
  Left={<button>按钮</button>}
/>
```


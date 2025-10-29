# 非父子组件通信

非父子组件数据的共享

- 在开发中，比较常见的数据传递方式是通过props属性自上而下（由父到子进行传递）
- 但是对于有一些场景：比如一些数据需要在多个组件中进行共享（地区偏好、ui主题、用户登录状态、用户信息等）
- 如果我们在顶层的App中定义这些信息，之后一层层传递下去，那么对于一些中间层不需要数据的组件来说，是一种冗余的操作



react提供了一个api：Context

- context提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树得逐层传递props
- context设计目的是为了共享那些对于一个组件树而言是“全局”得数据，例如当前认证的用户、主题或首选语言

（后面会讲redux，提供一个单独的库，就不需要这个了）

### 1.创建context

```jsx
import React from 'react';

// 创建 Context，可以设置默认值
const ThemeContext = React.createContext({
  color: 'blue',
  fontSize: '16px'
});
```

### 2.使用Provider提供数据

```jsx
function App() {
  // 准备要共享的数据
  const theme = {
    color: 'red',
    fontSize: '20px',
    mode: 'dark'
  };

  return (
    // 用 Provider 包裹需要共享数据的组件
    <ThemeContext.Provider value={theme}>
      <Header />
      <Content />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

### 3.在子组件中消费数据

```jsx
import React, { useContext } from 'react';

function Header() {
  // 使用 useContext 获取 Context 值
  const theme = useContext(ThemeContext);
  
  return (
    <header style={{ color: theme.color, fontSize: theme.fontSize }}>
      <h1>网站标题</h1>
      <Navigation />
    </header>
  );
}

function Navigation() {
  // 任何深度的子组件都可以直接获取 Context
  const theme = useContext(ThemeContext);
  
  return (
    <nav style={{ backgroundColor: theme.mode === 'dark' ? '#333' : '#fff' }}>
      <a href="#">首页</a>
      <a href="#">关于</a>
    </nav>
  );
}
```



- 什么时候使用Context.Consumer呢？
  - 1.当使用value的组件是一个函数式组件时
  - 2.当组件中需要多个Context时



## provider和consumer这两个双标签中间内容的作用

## `<ThemeContext.Provider>` 中间的内容

### 作用：**定义哪些组件可以访问 Context**

jsx

```
<ThemeContext.Provider value={theme}>
  {/* 这里的所有组件和子组件都能访问到 theme 值 */}
  <Header />
  <Content />
  <Footer />
</ThemeContext.Provider>
```



**相当于**：划定一个"特权区域"，在这个区域内的所有组件都能使用这个 Context。

### 实际例子：

jsx

```
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      {/* 这些组件都能拿到 theme 值 */}
      <Header />        {/* 可以访问 theme */}
      <Content />       {/* 可以访问 theme */}
      <Sidebar />       {/* 可以访问 theme */}
    </ThemeContext.Provider>
  );
}
```



------

## `<ThemeContext.Consumer>` 中间的内容

### 作用：**具体如何使用 Context 值**

jsx

```
<ThemeContext.Consumer>
  {theme => (
    /* 这里定义如何渲染，基于 theme 值 */
    <div style={{ background: theme === 'light' ? 'white' : 'black' }}>
      当前主题: {theme}
    </div>
  )}
</ThemeContext.Consumer>
```



**相当于**：一个"使用门票的环节"，在这里具体消费和使用 Context 的值。

# 普通的css

我们通常会编写到一个单独的文件，之后再进行引入

这样的编写方式和普通的网页开发中编写方法是一致的：

- 如果按照普通网页标准去编写，也不会有太大的问题
- 但是组件化开发中我们总是希望组件是一个独立的模块，即使是样式也只是在自己内部生效，不会互相影响
- 但是**普通的css全部都属于全局的css**，样式之间会互相影响

**这种编写方式最大的问题是样式之间会互相层叠掉**

例子：

```jsx
import React, { PureComponent } from 'react'
import "./App.css"

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className='title'>title</h2>
        <p className='content'>content</p>
      </div>
    )
  }
}

export default App
```

```css
.title {
  color: pink;
  font-size: 30px;
}

.content {
  color: lightcoral;
  font-size: 20px;
}
```


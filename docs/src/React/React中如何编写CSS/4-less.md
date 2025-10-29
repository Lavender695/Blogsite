# less的编写

**LESS 是 CSS 的超集**：

- 所有有效的 CSS 都是有效的 LESS
- LESS 添加了编程语言特性（变量、函数、混合等）
- 需要编译为纯 CSS 才能在浏览器中运行
- 在现代前端中逐渐被 CSS-in-JS 和 Utility-First 方案取代

对于新项目，建议优先考虑 **Tailwind CSS**、**Styled-components** 或 **现代原生 CSS**，LESS 更适合维护现有项目或特定需求场景。

## 安装

这里我们将使用craco

**CRACO** 的全称是 **Create React App Configuration Override**，是一个用于自定义 **Create React App (CRA)** 配置的工具。

### 为什么要用 CRACO？

Create React App 默认将 webpack 等构建工具的配置隐藏起来，目的是简化配置过程。但这也意味着：

- ❌ 无法直接修改 webpack 配置
- ❌ 无法自定义 babel 配置
- ❌ 难以添加额外的 loader 或 plugin

**CRACO 解决了这个问题** - 它让你能够在保持 CRA 便利性的同时，灵活地自定义配置。

**首先安装craco**

```bash
npm install @craco/craco
```

然后在项目根目录创建一个`craco.config.js`用于修改默认配置

**再安装craco-less**

```bash
npm install craco-less
```

从官网复制一份代码到craco.config.js

```js
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

记得改package.json里面的scripts

```json
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
     ...
  }
```

再就是最主要的文件了

```jsx
// App.jsx
import React, { PureComponent } from 'react'
import "./App.less"

export class App extends PureComponent {
  render() {
    return (
      <div className='all'>
        <h2 className='title'>title</h2>
        <p className='content'>content</p>
      </div>
    )
  }
}

export default App
```

```less
// App.less
@primary-color: red;

.all {
  .title {
    color: @primary-color;
    font-size: 30px;
  }

  .content {
    color: @primary-color;
    font-size: 20px;
  }
}
```


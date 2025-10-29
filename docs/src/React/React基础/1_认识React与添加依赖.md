## React的介绍
用于构建用户界面的 JavaScript 库



### 声明式编程

声明式编程是目前整个大前端开发的模式：vue, react, flutter, swiftUI
它允许我们只需要维护自己的状态，当状态改变时，react可以根据最新的状态去渲染我们的UI界面

UI = f（state）

### 组件化开发

我们会将复杂的界面拆分成一个个小的组件，形成一个组件树



### React的开发依赖

- reatct：包含react所必须的核心代码
- react-dom：react渲染在不同平台所需要的核心代码
- babel：将jsx转换成React代码的工具（jsx —> js） 
- 对于Vue来说，只是依赖一个vue.js文件就可以，但是react要依赖三个包，因为它做了一个细化，让每个包可以去做自己的事情



### Babel和React的关系

Babel，又名babel.js，是目前前端使用非常广泛的编译器、转移器

ES6、React JSX语法、TypeScript语法，都可以通过Babel工具转换成普通的Javascript代码

默认情况下开发React其实可以不用使用babel

但是前提是我们自己使用React.createElement来编写源代码，但是它编写的代码非常繁琐，可读性差

那么就可以直接编写jsx（JavaScript XML）的语法，并且让babel帮助我们转换成React.createElement



# 添加依赖的三种方式

## CDN引入

最主要的：

```js
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

```

例子：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector('#root'))

    let message = "Hello World"

    // 监听按钮的点击
    function btnClick() {
        // 修改数据
        message = "Have a nice day"
        // 重新渲染界面（react不像vue一样会自动主动渲染）
        rootRender()
    }

    // 封装一个渲染函数
    function rootRender() {
        root.render((
            <div>
                <h2>{message}</h2>
                <button onClick={btnClick}>Click me</button>  
            </div>
        ))
    }

    rootRender()
    
    </script>

</body>
</html>
```





## 下载引入

先把网站里面的代码全部都搬下来，然后cdn引入就可以换成

```js
<script src="../lib/react.js"></script>
<script src="../lib/react-dom.js"></script>
<script src="../lib/babel.js"></script>
```





## npm下载引入（脚手架）





## 案例实现

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div id="root"></div>

<script src="../lib/react.js"></script>
<script src="../lib/react-dom.js"></script>
<script src="../lib/babel.js"></script>

    <script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector('#root'))

    let message = "Hello World"

    // 监听按钮的点击
    function btnClick() {
        // 修改数据
        message = "Have a nice day"
        // 重新渲染界面（react不像vue一样会自动主动渲染）
        rootRender()
    }

    // 封装一个渲染函数
    function rootRender() {
        root.render((
            <div>
                <h2>{message}</h2>
                <button onClick={btnClick}>Click me</button>  
            </div>
        ))
    }

    rootRender()
    
    </script>

</body>
</html>
```


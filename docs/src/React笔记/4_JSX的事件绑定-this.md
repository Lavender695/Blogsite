# JSX的事件绑定

# this

## this的四种绑定规则

1. 默认绑定：独立执行foo（）
2. 隐式绑定：被一个对象执行obj.foo() -> obj
3. 显示绑定：call/apply/bind
4. new绑定：new foo() -> 创建一个新对象，并且赋值给this



## jsx事件回调中this的三条绑定方式

### 一、bind绑定

```js
    <script type="text/babel">
        // 1.定义App根组件
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    message: "Hello Liwenting",
                }
            }

            btnClick() {
                console.log("btnClick:", this)
            }

            render() {
                const { message } = this.state

                return (
                    <div>
                        <h2>{ message }</h2>   
                        
                    {/*此时绑定的是这个App的实例*/}
                        <button onClick={this.btnClick.bind(this)}>按钮</button>
                    </div>
                )
            }
        }

        // 2.创建root并且渲染App组件
        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App/>)

    </script>
```

```js
<button onClick={this.btnClick.bind(123)}>按钮</button>
```



### 二、ES6 class fields（了解）

  Class Fields 语法允许你**直接在类主体内部声明和初始化实例属性**，而无需在 `constructor` 中操作。同时，它引入了一种新的、自动绑定 `this` 的类方法定义方式。

  你可以像声明变量一样，直接在类内部声明属性。

**ES6 Class Fields** 极大地提升了 JavaScript 类的开发体验和健壮性：

- **`property = value`**：让状态声明更清晰。
- **`static property = value`**：让静态成员定义更一体化。
- **`#privateField`**：实现了真正的封装，写出了更健壮的代码。
- **`method = () => {}`**：优雅地解决了困扰已久的 `this` 绑定问题。

```js
<script type="text/babel">
        // 1.定义App根组件
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    message: "Hello Liwenting",
                    obj: {
                        name:123
                    }
                }
            }

            // 在此处使用箭头函数，自动将this绑定为上层作用域的this，即App实例
            btnClick = () => {
                console.log("btnClick:", this)
            }

            render() {
                const { message } = this.state

                return (
                    <div>
                        <h2>{ message }</h2>   
                        
                        {/*这样就不用写其他的什么*/}
                        <button onClick={this.btnClick}>按钮</button>
                    </div>
                )
            }
        }

        // 2.创建root并且渲染App组件
        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App/>)

    </script>
```



### 三、直接传入一个箭头函数（重要）

```js
{/*这里的this就是App实例*/}
<button onClick={() => console.log("btnClick:", this)}>按钮</button>
{/*这里实质上是一个隐式绑定*/}
<button onClick={() => this.btnClick2()}>按钮2</button>
```





# 参数

## event参数

作为一个函数调用时侯的默认参数传递

如果是传递多个参数，推荐使用箭头函数的写法

```js
btnClick(e) {
    console.log("btnClick:", e, this)
}

render() {
    const { message } = this.state

    return (
        <div>
            {/* 1.event参数的传递 */}  
            <button onClick={this.btnClick.bind(this)}>按钮</button> 
            <button onClick={(e) => this.btnClick(e)}>按钮</button>

            {/* 2.传递额外的参数 */}
            <button onClick={(event) => this.brnClick(event, age, name, height)}>按钮</button>
        </div>
    )
```



# 事件参数传递

- 在执行事件函数时，有可能我们需要获取一些参数信息：比如event对象、其他参数
- 情况一：获取event对象
  - 很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
  - 那么默认情况下，event对象有被直接传入，函数就可以获取到event对象
- 情况二：获取更多参数
  - 有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数

```jsx
<button onClick={(e) => this.btnClick(e, "lwt", 18)}按钮</button>
```



#### 电影选择案例

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            color: pink;
        }
    </style>
</head>

<body>
    <div id="root"></div>

    <script src="../lib/react.js"></script>
    <script src="../lib/react-dom.js"></script>
    <script src="../lib/babel.js"></script>

    <script type="text/babel">
        // 1.定义App根组件
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    message: "Hello Liwenting",
                    movies: ["花样年华", "花束般的恋爱", "甜蜜蜜", "爱乐之城"],
                    currentIndex: 0
                }
            }

            itemClick(index) {
                console.log(index)
                this.setState({ currentIndex: index })
            }

            render() {
                const { message, movies, currentIndex } = this.state

                const liEls = movies.map((item, index) => {
                    return (
                        <li className={currentIndex === index ? 'active' : ''}
                            key={item}
                            onClick={() => this.itemClick(index)}
                        > {item}</li>
                    )
                })


                return (
                    <div>
                        <h2>{message}</h2>
                        <ul>
                            {liEls}
                        </ul>
                    </div >
                )
            }
        }

        // 2.创建root并且渲染App组件
        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App />)

    </script>
</body>

</html>
```


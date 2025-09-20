### Hello React例子中
#### 整个逻辑可以看作一个整体，那么我们就可以将其封装成一个组件

root.render参数是一个html元素或者一个组件
所以我们可以先将之前的业务逻辑封装到一个组件中，然后传入到ReactDOM.render函数中的第一个参数

#### React中，如何封装一个组件呢？
这里我们暂时使用类的方式封装组件：
1. 定义一个类（类名大写，组件的名称是必须大写的，小写会被认为是hrml元素），继承自React.Component
2. 实现当前组件的render函数

- render当中返回的jsx内容，就是之后React会帮助我们渲染的内容



### 组件化-数据依赖

#### 数据在哪里定义？

- 参与界面更新的数据我摸也可以称之为是参与数据流，这个数据是定义在当前对象的state中
  - 我们可以通过在构造函数中this.state = {定义的数据}
  - 当我们的数据发生变化时，我们可以调用this.setState来更新数据，并且通知React进行update操作
  - 在进行update操作时，就会重新调用render函数，并且使用最新的数据来渲染界面



### 组件化-事件绑定

在类中直接定义一个函数，并且将这个函数绑定到元素的onClick事件上，默认情况下这个函数的this指向undefined

我们在绑定的函数中，可能想要使用当前对象，比如执行this.setState函数们就必须拿到当前对象的this

- 我们就需要在传入函数时，给这个函数直接绑定this
- 类似于：`<button onClick={this.btnClick.bind(this)}>Click me</button>`

```jsx
    <script type="text/babel">
        // 类组件和函数式组件
        class App extends React.Component {
            // 组件数据
            constructor() {
                super()
                this.state = {
                    message: "Hello World"
                }
            }

            // 组件方法（实例方法）
            btnClick() {
                console.log("btnClick:", this)
            }

            // 渲染内容 render方法
            render() {
                return (
                    <div>
                        <h2>{this.state.message}</h2>
                        <button onClick={this.btnClick.bind(this)}>Click me</button>
                    </div>
                )
            }
        }

        // 渲染根组件
        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App />)

    </script>
```





## 案例-电影列表

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

        class App extends React.Component {
            constructor() {
                super()

                this.state = {
                    movies: ['爱乐之城', '海上钢琴师', '肖申克的救赎', '猫鼠游戏']
                }
            }

            render() {
                // 1.对movies进行for循环
                // const liEls = []
                // for (let i = 0; i < this.state.movies.length; i++) {
                //     const movie = this.state.movies[i]
                //     const liEl = <li>{movie}</li>
                //     liEls.push(liEl)
                // }
                // return (
                //     <ul>
                //         {liEls}    
                //     </ul>
                // )

                // 2.movies数据 => liEls数组
                // const liEls = this.state.movies.map(item => {
                //     return <li key="item">{item}</li>
                // })
                // return (
                //     <ul>
                //         {liEls}    
                //     </ul>
                // )

                // 3.重构2
                return (
                    <ul>
                        {
                            this.state.movies.map(item => <li key={item}>{item}</li>)
                        }
                    </ul>
                )

            }
        }


        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App />)


    </script>

</body>

</html>
```





## 案例-计数器

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
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    message: "当前计数：",
                    counter: 100
                }

                this.increment = this.increment.bind(this)
                this.decrement = this.decrement.bind(this)
            }

            render() {
                return (
                    <div>
                        <h2>{this.state.message}{this.state.counter}</h2>
                        <button onClick={this.increment}>+1</button>
                        <button onClick={this.decrement}>-1</button>
                    </div>
                )
            }

            // 注意！！！永远不要直接修改this.state，要通过this.setState来更新组件状态
            increment() {
                this.setState({
                    counter: this.state.counter + 1
                })
            }

            decrement() {
                this.setState({
                    counter: this.state.counter - 1
                })
            }

        }

        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App/>)
    </script>
</body>
</html>
```

### 关于setState()

`setState()` 是 React 类组件中用于**更新组件状态（state）** 并**触发组件重新渲染**的唯一方法。

`setState()`是React框架的特定API。

**重要原则：永远不要直接修改 `this.state`！**

```jsx
// 错误！这不会重新渲染组件
this.state.counter = 1;

// 正确！使用 setState 来更新
this.setState({ counter: 1 });
```


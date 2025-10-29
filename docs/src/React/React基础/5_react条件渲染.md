# React条件渲染

某些情况下，界面的内容会根据不同的情况显示不同的内容，或者决定时候渲染某部分内容

- 在vue中，我们会通过指令来控制：比如v-if，v-show
- 在react中，所有的条件判断都和普通的JavaScript代码一致



## 条件判断方式一：使用if进行条件判断

- 适合逻辑比较多的情况

```js
    <script type="text/babel">
        // 1.定义App根组件
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    isReady: false
                }
            }
            render() {
                const { isReady } = this.state

                let showElement = null
                if (isReady) {
                    showElement = <h2>准备开始比赛吧！</h2>
                } else {
                    showElement = <h1>请提前做好准备！</h1>
                }

                return (
                    <div>
                        <div>{ showElement }</div>    
                    </div>
                )
            }
        }

        // 2.创建root并且渲染App组件
        const root = ReactDOM.createRoot(document.querySelector("#root"))
        root.render(<App/>)

    </script>
```



## 方式二：三元运算符

- 适合逻辑比较简单的情况

```js
<div>{ isReady? <button>开始战斗！</button> : <h3>赶紧准备</h3> }</div>
```



## 方式三：与运算符&&

- 适合如果条件成立，渲染一个组件，如果条件不成立，什么内容也不渲染

```js
<div>{ friend && <div>{ friend.name + ' ' + friend.desc }</div> }</div>
```

> 先判断friend是否为true，若为true，才加载后面的`<div>{ friend.name + ' ' + friend.desc }</div>`，若为空或undefined，则不显示这一块内容
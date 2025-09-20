# 认识 JSX

- jsx是一种JavaScript的语法扩展，也在很多地方称之为JavaScript XML

- 它用于描述我们的ui界面，并且可以和js融合在一起使用

### JSX中注释的写法

```jsx
 {/* JSX里注释的写法 */}
```

### JSX嵌入变量作为子元素

- 当变量是Number、String、Array类型时，可以直接显示
- 当变量是null、undefined、Boolean类型时，内容为空
  - 如果希望显示为null、undefined、boolean，那么需要转成字符串
  - 可以用toString方法、和空字符串拼接、String(变量)等方式
- Object对象类型不能作为子元素

### JSX 嵌入表达式
- 可以插入对应的表达式
- 可以插入三元运算符
- 可以调用方法获取结果，例如：

```jsx
<ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul> 
```

- 可以执行一个函数

> 在里面基本就和 JavaScript 差不多



## JSX中绑定属性

#### 基本属性

```jsx
        class App extends React.Component {
            constructor() {
                super()
                this.state = {
                    title : "lwt",
                    imgUrl : "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg",
                    href : "https://www.baidu.com"
                }
            }
            render() {
                const { title, imgUrl, href } = this.state

                return (
                    <div>
                        <h2 title={title}>Hello Lwt</h2>
                        <img src={imgUrl} alt=""/>
                        <a href={href}>baidu</a>
                    </div>
                )
            }
        }
```

#### class和style属性绑定

- 绑定class属性：最好使用**className**
- 因为js中有class关键字，容易混淆，会报警告

class绑定的写法：

1. 字符串的拼接

```jsx
const className = `abc cba ${isActive ? 'ohmygod' : ''}`
```

2. 第三方库classnames -> npm install classnames

style绑定对象类型的写法：

```jsx
<h2 style={{color: "red", fontSize: 16}}></h2>
```

1. 第一层大括号：`{ }` (JSX 的 JavaScript 表达式插值)

2. 第二层大括号：`{ }` (JavaScript 的对象字面量)

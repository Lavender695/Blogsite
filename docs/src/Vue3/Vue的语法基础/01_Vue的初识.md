# Vue
- 一套用于构建用户界面的渐进式 JavaScript框架，全称是Vue.js或者Vuejs
- 提供了一套声明式的、组件化的编程模型

国内外三大框架：Vue、React、Angular

学好Vue是在国内前端市场立足的基础，React是高薪/国外找工作的基础




## 安装和使用
- 方式一：在页面中通过CDN的方式来引入
- 方式二：下载Vue的js文件，并且自己手动引入
- 方式三：通过npm包管理工具安装使用它
- 方式四：直接通过Vue CLI创建项目，并且使用它



### 通过CDN引入vue
若不考虑版本控制、缓存策略和稳定性，可以直接使用

```javascript
<script src="https://unpkg.com/vue@3"></script>
```

若使用带具体版本的路径（安全性较高）

```javascript
<script src="https://unpkg.com/vue@3.4.21/dist/vue.global.js"></script>
```

具体范例

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Hello this is an example</h2>
    <p>jsut a content</p>

    <div id="一个可挂载的容器"></div>

    <!--CDN地址-->
    <script src="https://unpkg.com/vue@3"></script>
    <script>
        //使用Vue
        const app = Vue.createApp({
            template: `<h2>Hello world</h2>`
        })

        //mount=挂载
        app.mount("#一个可挂载的容器")
    </script>
</body>
</html>
```

### 通过本地引入vue
可以先创建一个lib文件夹，然后在lib文件夹中创建文件vue.js，再在这个文件中复制粘贴刚刚cdn地址中的所有内容，然后在需要引入vue的html文件中就可以通过`<script src="./lib/vue.js"></script>`实现本地引入啦！

如下:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>


    <script src="./lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
            template: `<h2>Hello world</h2>`
        })

        //2.挂载app
        app.mount("#app")

    </script>
</body>
</html>
```



# Vue的基本语法
## 动态数据
在template中可以使用插值语法`{{title}}`，英文moustache
此时需要在Vue.createApp()函数返回的这个对象中新添加一个data属性，这个属性只能返回一个函数，我们可以使用的就是这个函数的返回值
例子如下：
```javascript
<body>
    
    <div id="app"></div>


    <script src="./lib/vue.js"></script>
    <script>
        const app = Vue.createApp({
            template: `<h2>{{title}}</h2>`,
            data: function() {
                return {
                    title: 'Hello world!'
                }
            }
        })
        app.mount('#app')
    </script>
</body>
```

## 列表数据
在实际开发中我们拿到的数据往往是列表，这时我们用到的依然是data中函数的返回值
然后可以在template中使用`<ul><li v-for="item in 某list">{{item}}</li></ul>`
具体如下：
```javascript
<body>
    
    <div id="app"></div>

    <script src="./lib/vue.js"></script>
    <script>
        const app = Vue.createApp({
            template: `
            <h2>影视列表</h2>
            <ul>
                <li v-for="item in movies">{{item}}</li>
            </ul>
            `,
            data: function() {
                return {
                    movies: ['爱乐之城', '恶作剧之吻', '花束般的恋爱']
                }
            }
        })
        app.mount('#app')
    </script>
</body>
```


## 计数器功能
- methods语法
- `<button @click="methods中某属性"></button>`

具体如下：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <div id="app"></div>

    <script src="./lib/vue.js"></script>
    <script>
        const app = Vue.createApp({
            template: `
            <h2>当前计数：{{counter}}</h2>
            <button @click='plus'>+1</button>
            <button @click='minus'>-1</button>
            `,
            data: function() {
                return {
                    counter: 0
                }
            },
            methods: {
                plus: function() {
                    this.counter++
                },
                minus: function() {
                    this.counter--
                }
            }
        })
        app.mount('#app')
    </script>
</body>
</html>
```

可以删掉Vue.createApp中的template属性，因为在template中编写html有一点麻烦

所以可以作此**重构**：

```javascript
<body>
    
    <div id="app">
        <h2>当前计数：{{counter}}</h2>
        <button @click='plus'>+1</button>
        <button @click='minus'>-1</button>
    </div>

    <script src="./lib/vue.js"></script>
    <script>
        const app = Vue.createApp({
            data: function() {
                return {
                    counter: 0
                }
            },
            methods: {
                plus: function() {
                    this.counter++
                },
                minus: function() {
                    this.counter--
                }
            }
        })
        app.mount('#app')
    </script>
</body>
```

- 当Vue.createApp中没有template属性时，就可以将挂载的容器与data和methods联系起来
- 当Vue.createApp中有template属性时，默认将挂载的容器内容替换为template中内容
- 注意这里是将原本template中的内容**放入了所挂载的app容器当中**，如果不在app挂载的容器中的话，是无法将此内容与data和methods联系起来的



## 声明式和命令式

- 命令时编程关注的是“how to do”，自己完成整个how的过程
  - 原生开发属于命令式编程，早期的js和jQuery开发都是通过命令式
  
- 声明式编程关注的是“what to do”，框架（机器）完成“how”的过程
- 在vue的实现过程中，我们是如何操作的呢？
  - 在createApp传入的对象中声明需要的内容，模板template、数据data、方法methods
  - 这样的编写代码的过程称为声明式编程
  - 目前vue、react、angular、小程序都是使用声明式编程



# options-api



## options-data属性

- 这个属性必须是一个函数，并且这个函数必须返回一个对象
- 这个对象会被vue劫持并渲染到页面
- 被劫持的对象如果发生了变化都会被vue自动渲染到页面上



## options-methods属性

- methods属性是一个对象，通常我们会在这个对象中定义很多的方法

  - 这些犯法可以被绑定到模板中
  - 在该方法中，我们可以使用this关键字来直接访问到data中返回的对象的属性

  

- 如果使用箭头函数定义methods，`this`不会绑定到组件实例（箭头函数继承外层作用域的`this`）：

```javascript
methods: {
  // ❌ 错误：箭头函数的 this 指向外层（可能是 undefined 或 window）
  badExample: () => {
    console.log(this.message); // 输出 undefined
  },
  // ✅ 正确：普通函数
  goodExample() {
    console.log(this.message); // 正常访问
  }
  //或者
  goodExample: function() {
    console.log(this.message);
  }
}
```



## 其他属性

- 这里还可以定义很多其他的属性
    - 比如props、computed、watch、emits、setup等等
    - 也包括很多的生命周期函数

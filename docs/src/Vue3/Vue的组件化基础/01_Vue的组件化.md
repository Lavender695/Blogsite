# 组件化开发思想

- 将页面先拆分，再组合
- 易于开发和维护
- 现在整个大前端开发都是组件化的天下

- 我们需要通过组件化的思想来思考整个应用程序：
  - 我们将一个完整的页面分为很多个组件
  - 每个组件都用于实现页面的一个功能块
  - 而每一个组件又可以进行细分
  - 而组件本身又可以在多个地方进行复用



# Vue的组件化

- 前面我们的createApp函数传入了一个对象App，这个对象其实本质上就是一个组件，也是我们应用程序的根组件
- 任何应用都会被抽象成一颗组件树



# 注册全局组件

- `app.component("给你的组件起一个名称", 你的组件)`
- 只要通过app.component注册的组件都是全局组件
- 全局组件的特点：一旦注册成功后，可以在任意其他组件的template中使用

```javascript
<body>

    <div id="app">
        <!--使用product-item组件-->
        <product-item></product-item>

        <one-component></one-component>
    </div>

    <template id="item">
        <h2>我是productItem的组件</h2>
    </template>

    <script src="../lib/vue.js"></script>
    <script>
        //1.组件：App组件(根组件)
        const App = {}

        //2.开发product-item的组件
        const productItem = {
            template: "#item"
        }

        //3.创建app
        const app = Vue.createApp(App)

        //4.注册一个全局组件
        app.component("product-item", productItem)

        //简洁也可以这样写
        app.component("one-component", {
            template: `
            <h2>我是oneComponent的组件</h2>
            `
        })

        //5.挂载
        app.mount('#app')
    </script>
</body>
```



## 组件的名称

- 在通过app.component注册一个组件的时候，第一个参数时组件的名称，定义组件名的方式有两种：

  - 方式一：**使用kebab-case（短横线分隔符）（更常见）**
  - 方式二：使用PascalCase（驼峰标识符）

  > html中不区分大小写，所以在这里使用组件时只能写小写才能找到对应的组件，但是在.vue文件中就不存在这个问题



# 注册局部组件

- 在开发当中99%用到的都是局部组件，只有一个组件确实会在其他组件中用到时才会注册全局组件
- 使用`components`这个option api

注册局部组件的样例：

```javascript
<body>
    
    <div id="app">
        <product-item></product-item>
    </div>

    <template id="item">
        <h2>hello im component item, my name is {{ name }}</h2>
    </template>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
            //components: options api
            components: {
                ProductItem: { <--或者写"product-item"
                    template: "#item",
                    data() {
                        return {
                            name: "Aihara"
                        }
                    }
                }
            },

            //data: options api
            data() {
                return {
                    message: "Hello world"
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```

也可以单独把ProductItem组件拿出来，如下：

```javascript
        const ProductItem = {
            template: "#item",
            data() {
                return {
                    name: "Aihara"
                }
            }
        }

        //1.创建app
        const app = Vue.createApp({
            //components: options api
            components: {
                ProductItem
            },
```



#  SFC (Single File Component)

- 如果我们想要使用SFC的.vue文件，比较常见的时两种方式：
  - 方式一：使用Vue CLI来创建项目，项目会默认帮助我们配置好所有的配置选项，可以在其中直接使用.vue文件
  - 方式二：自己使用webpack或rollup或vite这类打包工具，对其进行打包处理
- 我们最终，不论是后期做项目，还是在公司进行开发，通常都会采用Vue CLI的方式来完成（脚手架）

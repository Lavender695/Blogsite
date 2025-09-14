# 计算属性computed

- 对于任何包含响应式数据的复杂逻辑，你都应该使用计算属性

- computed这个options api是一个对象，其中的值应该是函数

- 计算属性中的函数在使用Mustache插入语法时不写()
- 与methods相比，计算属性有缓存，依赖不变就不会重新算，依赖变化自动重新算

简单了解：

- 计算属性computed的完整写法中有set和get两个方法

```javascript
<body>
    
    <div id="app">
        <h2>{{ fullname }}</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data: options api
            data() {
                return {
                    firstname: 'Terrisa',
                    lastname: 'Olivia',
                }
            },
            computed: {
                fullname() {
                    return this.firstname + ' ' + this.lastname
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



# 侦听器watch

- 默认有两个参数：newValue和oldValue
- 如果监听的是一个对象的话，那么拿到的就是proxy
- proxy可以这样用：newValue.name，oldValue.name
- 如果不想要proxy想要之前的对象的话可以这样：
  - `{ ...newValue }`得到一个与原本对象相同的新对象
  - `Vue.toRaw(newValue)`得到原本的对象

```javascript
<body>
    
    <div id="app">
        Text:{{message}}
        <button @click="btn">click me</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data: options api
            data() {
                return {
                    message: "Hello world"
                }
            },

            methods: {
                btn() {
                    this.message = "Konnnichiwa Sekai"
                }
            },

            watch: {
                message() {
                    console.log("message has changed.")
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## 深度监听

- **配置选项deep**

- 默认watch是不会进行深度监听的
- 即当监听一个对象时，该对象的其中一个属性改变，而非整个对象改变时，watch是不会监听到的

watch的完整写法其实是这样：

```javascript
//进行深度监听
info: {
  handler(newValue, oldValue) {
    console.log("我听到了info改变的回响")
  },
  //监听器选项
  //info进行深度监听
  deep: true
}
```

> 没有handler直接info() {}的写法其实是语法糖



## 首次渲染立即执行监听

- **配置选项immediate**

```javascript
immediate: true
```



 ## 只监听对象的某个属性

- 注意打引号

```javascript
"info.name"() {
  console.log("我听到了name改变的回响")
}
```


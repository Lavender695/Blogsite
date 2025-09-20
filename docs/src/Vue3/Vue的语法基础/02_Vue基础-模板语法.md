## Vue的app代码片段

1. 可以自己写一段代码，然后在这个网址中生成一段代码：https://snippet-generator.app/

2. 其中我选择的description是create vue app，tab trigger是vueapp

3. 将网站生成的json代码复制
4. 打开vscode-file-preferences-configure snippets，选择html.json
5. 将复制的代码片段粘贴到此文件中
6. 即可完成用户自定义代码片段，可以直接在html文档中输入vueapp快速生成代码片段



# Vue的模板语法



## Mustache插值语法

```javascript
<body>
    
    <div id="app">
        <!--1.基本使用-->
        <h2>{{ message }}</h2>
        <h2>当前计数：{{ counter }}</h2>

        <!--2.表达式-->
        <h2>计数双倍：{{ counter * 2 }}</h2>
        <h2>展示的信息：{{ info.split(" ") }}</h2>

        <!--3.三元运算符-->
        <h2>{{ age >= 18? "Adult": "Minor"}}</h2>

        <!--4.调用methods中函数-->
        <h2>{{ formatDate(time) }}</h2>

        <!--5.不可使用赋值语句或if语句-->
    </div>

    <script src="./lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    message: "Hello world",
                    counter: 100,
                    info: "The sunset we watched together is a momentary forever",
                    age: 19,
                    time: '16:34'
                }
            },
            methods: {
                formatDate(date) {
                    return "2025-7-14" + ' ' + date
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## v-once指令使用(了解)

- v-once表示某个东西**只会渲染一次**

具体如下：

```javascript
<body>
    
    <div id="app">
        <h2 v-once>Text:{{ message }}</h2>
		<!--这里的message在第一次渲染之后就不会再渲染了-->
        <!--哪怕message实际上已经改变-->

        <h2>counter: {{ counter }}</h2>
        <button @click="changeMessage">click me</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    message: "Hello world",
                    counter: 100
                }
            },
            methods: {
                changeMessage() {
                    this.message = "konnnichiwa sekai"
                    this.counter = 200
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## v-text指令使用(了解)

```javascript
<h2 v-text="message"></h2>
```

等价于

```javascript
<h2>{{ message }}</h2>
```

但是mustache语法比v-text更加灵活

在实际开发当中使用并不多



## v-html指令使用(了解)

- 让这个内容可以被vue解析，而不是直接把html代码像乱码一样呈现到页面上
- 实际应用较少

具体如下：

```javascript
<body>
    
    <div id="app">
        <h2>{{ content }}</h2>
        <h2 v-html="content"></h2>
    </div>
    <h2 style="color: pink; font-size: 2rem;">aihara kotoko</h2>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    content: `<h2 style="color: pink; size: 2rem;">aihara kotoko</h2>`
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## v-pre指令使用(了解)

- v-pre用于**跳过元素和它的子元素**的编译过程，显示原始的Mustache标签
  - 跳过不需要编译的节点，加快编译的速度

```javascript
<h2 v-pre>Text:{{message}}</h2>
```

显示的就是如下效果

```
Text:{{message}}
```



## v-cloak指令使用(了解)

- cloak意为斗篷，它的作用是当浏览器还没有加载完成这个vue组件时，先将它隐藏起来，以免页面上展示不美观的原始标签
- 需要与CSS一同使用

```css
<style>
      [v-cloak] {
          display: none;
      }
</style>
```

```html
<div id="app">
    <h2 v-cloak>Text:{{message}}</h2>
</div>
```

联合使用

实际使用较少，以上几点都只做了解



## v-memo指令使用

```javascript
    <div id="app">
        <div v-memo="[name]">
            <h2>name: {{ name }}</h2>
            <h2>age: {{ age }}</h2>
            <h2>gender: {{ gender }}</h2>
            <button @click="changeName">click me</button>
        </div>
    </div>
```

- 设置了`v-memo="[name]"`之后，只有name改变时这个div中的元素才会被重新渲染
- 若改变的是age或者gender，不会重新渲染，页面保持原状





## v-bind指令使用(非常重要！)

- 必须掌握！！开发当中用得非常多

- 前面讲的一系列指令，主要是将值插入到模板内容中
- 但是除了内容需要动态来决定外，某些属性我们也希望动态来绑定
  - 比如动态绑定a元素的href属性
  - 比如动态绑定img元素的src属性

```javascript
    <div id="app">
        <!--1.绑定img的src属性-->
        <img v-bind:src="imgUrl" alt="">

        <!--2.绑定a的href属性-->
        <a v-bind:href="href">给我一种氛围感</a>
    </div>
```

- 语法糖：可以将`v-bind:`简写为`:`

```javascript
<img :src="imgUrl" alt="">
            
<a :href="href">给我一种氛围感</a>
```



### v-bind绑定class属性

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        button.active{
            color:purple
        }
    </style>
</head>
<body>
    
    <div id="app">
        <!--1.基本绑定class-->
        <h2 :class="classes">Hello world</h2>
        
        <!--2.动态class可以写成对象语法-->
        <button :class="{ active: isActive ? 'active' : ''}" @click="btnClick">按我变色</button>

        <!--2.1.对象语法的基本使用-->
        <!--这里的键值对的值必须是布尔值-->
        <button :class="{ active: isActive }" @click="btnClick">按我变色</button>

        <!--2.2.对象语法的多个键值对-->
        <button :class="{ active: isActive, other: true, else: false }" @click="btnClick">按我</button>

        <!--2.3.动态绑定的class可以和普通的class同时使用，并不会覆盖或怎么样-->
        <button class="abc" :class="{ active: isActive, other: true, else: false }" @click="btnClick">点我</button>

        <!--2.4.也可以配合使用methods，因为这里的class也是一个{}方法了，可以提出来的-->
        <button :class="getDynamicClasses()" @click="btnClick">戳我</button>

        <!--3.动态class可以写数组语法(了解)-->
        <h2 :class="['abc', classname, { active : isActive }]">Hello Array</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    classes: "aaa bbb ccc",
                    isActive: false,
                }
            },

            methods: {
                btnClick() {
                    this.isActive = !this.isActive
                },
                getDynamicClasses() {
                    //注意这里的this
                    return { active: this.isActive, other: true, else: false }
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
</html>
```





### v-bind绑定style属性

```javascript
<body>
    
    <div id="app">
        <!--1.普通的html写法-->
        <h2 style="color: pink; font-size: 30px;">Aishiteru</h2>

        <!--2.style中的某些值，来自data中-->
        <!--2.1.动态绑定style，在后面跟上对象类型，注意是一个对象-->
        <h2 v-bind:style="{ color: fontColor, fontSize: fontSize }">Aishiteru</h2>

        <!--2.2.动态的绑定属性，这个属性是一个对象-->
        <h2 :style="objStyle">Aishiteru</h2>

        <!--3.stylel的数组语法-->
        <h2 :style="[objStyle, { backgroundColor: 'lavender' }]">Aishiteru</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    fontColor: 'powderblue',
                    fontSize: '30px',
                    objStyle: {
                        fontSize: '50px',
                        color: 'olive'
                    }
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



### v-bind绑定不确定属性名(了解)

```javascript
<h2 :[name]="'aaa'">Hello world</h2>
```

```javascript
data: function() {
	return {
		name: "class"
	}
}
```



### v-bind绑定对象

```javascript
<body>
    
    <div id="app">
        <h2 v-bind="infos">hello world</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    infos: {
                        name: 'Doros',
                        age: 19,
                        gender: 'female',
                    }
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```


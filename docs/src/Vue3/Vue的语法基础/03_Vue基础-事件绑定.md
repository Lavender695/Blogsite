# 绑定事件的基本使用



## v-on绑定事件基本使用

```javascript
    <div id="app">
        <!--1.基本的写法-->
        <div class="box" v-on:click="divClick"></div>

        <!--2.语法糖写法（重点掌握）-->
        <div class="box" @click="divClick"></div>

        <!--3.绑定方法的位置，也可以写成一个表达式（不常用）-->
        <div class="box" @click="console.log('thank you')"></div>

        <!--4.元素绑定多个事件-->
        <div class="box" @click="divClick" @mousemove="divMousemove"></div>

        <!--也可以写成一个对象-->
        <div class="box" v-on:="{ click: divClick, mousemove: divMousemove }"></div>
    </div>
```



## 绑定事件参数传递

- 在模板中想要明确的获取event对象：$event

```javascript
<body>
    
    <div id="app">
        <!--1.默认参数：event对象-->
        <button @click="btn1">btn1</button>

        <!--2.明确参数-->
        <button @click="btn2('Doros', age)">btn2</button>

        <!--3.自己的参数和event对象-->
        <!--在模板中想要明确的获取event对象：$event-->
        <button @click="btn3(age, $event)">btn3</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data：options api
            data: function() {
                return {
                    age: 19
                }
            },

            methods: {
                btn1(event) {
                    console.log('btn1: ', event)
                },

                btn2(name, age) {
                    console.log('name: ', name, '\nage: ', age)
                },

                btn3(age, event) {
                    console.log(age, event)
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## 绑定事件的修饰符

### .stop=""

- 调用**event.stopPropagation()**

```javascript
<div class="box" @click="divClick">
  <button @click.stop="btnClick">button</button>
</div>
```

```javascript
methods: {
                divClick() {
                    console.log("div")
                },
                btnClick(event) {
                    console.log("btn")
                }
            }
```

就等于

```javascript
<div class="box" @click="divClick">
  <button @click="btnClick">button</button>
</div>
```

```javascript
methods: {
                divClick() {
                    console.log("div")
                },
                btnClick(event) {
                    event.stopPropagation()
                    console.log("btn")
                }
            }
```



> 以下仅作了解

### .prevent

调用**event.preventDefault()**

### .capture

添加事件侦听器时使用capture模式

### .self

只当事件是从侦听器绑定的元素本身触发时才触发回调

### .{keyAlias}

仅当事件是从特定键触发时才触发回调

### .once

只触发一次回调

### .left

只当点击鼠标左键时触发

### .right

只当点击鼠标右键时触发

### .middle

只当点击鼠标中键时触发

### .passive

{ passive: true }模式添加侦听器

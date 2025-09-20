# v-model

## 绑定input

- v-model的原理其实是背后有两个操作：
  - v-bind**绑定value**属性的值
  - v-on绑定input事件监听到函数中，函数会获取最新的值赋值到绑定的属性中

```javascript
    <div id="app">
        <input type="text" v-model="message">
        <button @click="btnClick">submit</button>
    </div>
```



## 绑定textarea

```javascript
<body>
    
    <div id="app">
        <textarea name="" id="" rows="10" cols="50" v-model="content"></textarea>
    
    <h2>输入的内容：{{ content }}</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data: options api
            data() {
                return {
                    content: '',
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## 绑定checkbox

- checkbox单选框：绑定到属性中的值是一个Boolean
- checkbox多选框：绑定到属性中的值是一个Array
- 注意：**多选框中，必须明确的绑定一个value值**

单选示例：

```javascript
<body>
    
    <div id="app">
        <label for="agree">
            <input type="checkbox" id="agree" v-model="isAgree">同意协议
        </label>

        <h2>是否同意：{{ isAgree }}</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data: options api
            data() {
                return {
                    isAgree: false,
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```

多选示例：

```javascript
<body>

        <div class="color">
            <h2>What color do you like?</h2>
            
            <label for="red">
                <input type="checkbox" id="red" v-model="colors" value="red">red
            </label>
            
            <label for="blue">
                <input type="checkbox" id="blue" v-model="colors" value="blue">blue
            </label>
            
            <label for="green">
                <input type="checkbox" id="green" v-model="colors" value="green">green
            </label>
            
            <label for="pink">
                <input type="checkbox" id="pink" v-model="colors" value="pink">pink
            </label>
            
            <label for="purple">
                <input type="checkbox" id="purple" v-model="colors" value="purple">purple
            </label>

            <h2>Chose are your liked colors: {{ colors }}</h2>
        </div>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
        //1.创建app
        const app = Vue.createApp({
          //data: options api
            data() {
                return {
                    colors: [],
                }
            }
        })
        //2.挂载
        app.mount('#app')
    </script>
</body>
```



## 绑定radio

- 需要value值
- 当name值相同时，两个radio互斥
- 如果v-model绑定的是同一个值，那么两个radio也互斥

```javascript
    <div id="app">
        <div class="gender">
            <label for="female">
                <input type="radio" id="female" v-model="gender" name="gender" value="female">女
            </label>
            <label for="male">
                <input type="radio" id="male" v-model="gender" name="gender" value="male">男
            </label>

            <h2>Your gender: {{ gender }}</h2>
        </div>
    </div>
```



## 绑定select

```javascript
    <div id="app">
        <!--select的单选-->
        <select v-model="fruit">
            <option value="apple">苹果</option>
            <option value="orrange">橘子</option>
            <option value="strawberry">草莓</option>
            <option value="watermelon">西瓜</option>
        </select>

        <hr>

        <!--select的多选-->
        <select multiple v-model="fruits">
            <option value="apple">苹果</option>
            <option value="orrange">橘子</option>
            <option value="strawberry">草莓</option>
            <option value="watermelon">西瓜</option>
        </select>
    </div>
```



# v-model的修饰符

- **lazy**——绑定change事件，只当提交的时候修改
- **number**——自动将内容转换为数字
- **trim**——去除首尾的空格
- 可以同时用多个修饰符

> 另外，再我们进行逻辑判断时，如果是一个string类型，在可以转换的情况下JavaScript会自动帮我们进行隐式转换

例子：

```javascript
    <div id="app">
        <input type="text" v-model.lazy="message">
        <h2>message: {{ message }}</h2>
    </div>
```



# v-model也可以用在组件上面


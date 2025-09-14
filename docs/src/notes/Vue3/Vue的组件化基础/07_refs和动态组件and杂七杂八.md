# $refs的使用

在某些情况下，我们在组件中想要直接获取到元素对象或者子组件实例：

- 我们可以给元素或者组件绑定一个ref的attribute属性

```javascript
methods: {
            btnClick() {
                // 1.获取h2/button元素
                console.log(this.$refs.title)
                console.log(this.$refs.btn)

                // 2.获取banner组件：组件实例
                console.log(this.$refs.banner)
                // 在父组件中可以主动的调用子组件的对象方法
                this.$refs.banner.bannerClick()

                // 3.获取banner组件实例，获取banner中的元素
                console.log(this.$refs.banner.$el)

                // 4.如果banner template是多个根，拿到的是第一个node节点
                // 注意：开发中不推荐一个组件的template中有多个根元素
                console.log(this.$refs.banner.$el.nextElementSibling)
            }
```

> `this.$parent`可获取父组件
>
> `this.$root`可获取根组件



# 动态组件

- `<component is="your_component_name">`

例子：

```vue
<template>
    <button @click="btnClick(0)">pink</button>
    <button @click="btnClick(1)">blue</button>
    <component :is="color"></component>
</template>

<script>
    import Pink from './Pink.vue';
    import Blue from './Blue.vue';

    export default {
        components: {
            Pink,
            Blue
        },
        data() {
            return {
                color: 'pink'
            }
        },
        methods: {
            btnClick(n) {
                this.color = ['pink', 'blue'][n]
            }
        }
    }
</script>
```

## 动态组件传值

- 就正常传

```vue
<component name="Aihara" :age="19" :is="currentTab"></component>
```



## keep-alive

- 可以不销毁组件

```javascript
    <keep-alive>
      <component :is="color"></component>
    </keep-alive>
```

- 可以精准包括哪些组件

```javascript
<keep-alive include="pink, blue"></keep-alive>
```

- 特别注意：这里用到的名字需要在子组件中单独设置一个option api：

```javascript
name: "pink"
```



#### keep-alive属性

- include——只有名称匹配的组件会被缓存
- exclude——任何名称匹配的组件都不会被缓存
- max——最多可以缓存多少组件实例，一旦达到这个数字，那么缓存组件中最近没有被访问的实例会被销毁



### 缓存组件的生命周期

- 对于缓存的(用了keep-alive的)组件来说，再次进入时，我们是不会执行created或者mounted等生命周期函数的
  - 但是有时候我们确实希望监听到何时重新进入到了组件，何时离开了组件
  - 这个时候我们可以使用activated和deactivated这两个生命周期钩子函数来监听



# webpack 的代码分包

- 对于一些不需要立即使用的组件，我们可以单独对它们进行拆分，拆分成一些小的代码块chunk.js
- 这些chunk.js会在需要时从服务器加载下来，并且运行代码，显示对应的内容

```javascript
import("path").then({} => {} )
```



## Vue中实现异步组件

- 如果我们的项目过大了，对于某些组件我们希望通过异步的方式来进行加载（目的是可以对其进行分包处理），那么Vue中给我们提供了一个函数：`defineAsyncComponent`

- `defineAsyncComponent`接受两种类型的参数：
  - 类型一：工厂函数，该工厂函数需要返回一个Promise对象
  - 类型二：接受一个对象类型，对异步函数进行配置





## v-model也可以绑定在组件上面





## 组件的混入Mixin

例子：

> message-mixin.js

```javascript
export default {
    data() {
        return {
            message: "Hello Vue"
        }
    }
}
```

> App.vue

```javascript
<template>
    <home></home>
    <catagory></catagory>
</template>

<script>
    import Catagory from './Catagory.vue';
    import Home from './Home.vue';

    export default {
        components: {
            Catagory,
            Home
        }
    }
</script>
```

> Home (Catagory基本相同)

```javascript
<template>
    <h2>我是Home，message：{{ message }}</h2>
</template>

<script>
    import messageMixin from './mixins/message-mixin';

    export default {
        mixins: [messageMixin]
    }
</script>
```


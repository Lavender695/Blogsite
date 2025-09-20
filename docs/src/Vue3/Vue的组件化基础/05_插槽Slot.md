# 认识Slot

- 为了让某些组件具备更强的通用性，我们不能将组件中的内容限制为固定的div、span等等元素
- 比如某些情况下我们使用组件，希望组件显示的是一个按钮，某些情况下我们使用组件希望显示的是一张图片
- 我们应该让使用者可以决定某一块区域到底存放什么内容和元素



# 如何使用Slot

- 我们可以来定义slot：
  - 插槽的使用过程其实是抽取共性、预留不同
  - 我们会将共同的元素、内容依然在组件内进行封装
  - 同时会将不同的元素使用slot作为占位，让外部决定到底显示什么样的元素
- 如何使用slot？
  - vue中将`<slot>`元素作为承载分发内容的出口
  - 在封装组件中，使用特殊的元素`<slot>`就可以为封装组件开启一个插槽
  - 该插槽插入什么内容取决于父组件如何使用

一个简单的例子展示：

> 子组件

```vue
<template>
    <div>
        <h2>这是一个插槽</h2>
        <slot><p>这是我的默认内容</p></slot>
    </div>
</template>
```

> 父组件

```vue
<script>
  import mySlot from './mySlot.vue';

  export default {
    components: {
      mySlot
    }
  }
</script>

<template>
  <h2>体验一下插槽</h2>

  <my-slot>
    <h2>好的</h2>
  </my-slot>
</template>
```

- 当父组件中的`<my-slot></my-slot>`中间没有内容时插槽显示默认内容
- 当有内容时子组件`<slot></slot>`中内容替换为该内容



# 具名插槽

例子：

> 子组件

```vue
<template>
    <div>
        <h2>这是一个插槽</h2>
        <slot name="left">左</slot>
        <slot name="center">中</slot>
        <slot name="right">右</slot>
    </div>
</template>
```

> 父组件

```vue
<template>
  <h2>体验一下插槽</h2>

  <my-slot>
    <template v-slot:left>
      <h2>this is left</h2>
    </template>

    <template v-slot:center>
      <h2>this is center</h2>
    </template>

    <template v-slot:right>
      <h2>this is right</h2>
    </template>
  </my-slot>
</template>
```

- 语法糖：`v-slot:`可以缩写为`#`

即

```javascript
<template #center></template>
```



## 动态插槽名

```vue
<template v-slot:[name]>
```

```javascript
    data() {
      return {
        name: 'left'
      }
    }
```



# 渲染作用域

- 父级模板里的所有内容都是在父级作用域中编译的
- 子模板里的所有内容都是在子作用域中编译的
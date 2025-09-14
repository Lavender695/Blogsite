# 认识vue-router

vue-router是基于路由和组件的

- 路由用于设定访问路径，将路径和组件映射起来
- 在vue-router的单页面应用中，页面的路径的改变就是组件的切换



# 安装库

```bash
npm install vue-router
```



# 改变url而不进行页面刷新的两种方式



## url的hash

- url的hash也就是锚点（#），本质上是改变window.location的href属性
- 我们可以通过直接赋值location.hash来改变href，但是页面不发生刷新

```javascript
<a href="#/home">home</a>
```



## HTML5的History

history接口时html5新增的，它有六种模式改变url而不刷新页面：

- replaceState：替换原来的路径
- pushState：使用新的路径
- popState：路径的回退
- go：向前或向后改变路径
- forward：向前改变路径
- back：向后改变路径



# 案例

> main.js

- 需要引入router
- 需要`app.use(router)`注册路由对象

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

```



> ./router/index.js

- `createWebHashHistory()`是选择hash模式
- 需要引入`createRouter`
- routes属性中写映射关系，是一个数组，元素是对象
- 第一个属性是path，第二个属性是component
- 使用redirect进行重定向

```javascript
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/Home.vue";
import About from "@/About.vue";

// 创建一个路由：映射关系
const router = createRouter({
    // 指定采用的模式：hash
    history: createWebHashHistory(),
    // 映射关系
    routes: [
        { path: "/", redirect: "/Home" },
        { path: "/home", component: Home },
        { path: "/about", component: About }
    ]
})

export default router
```



> App.vue

- `<router-view></router-view>`占位
- `<router-link to:"/home">Homepage</router-link>`自动生成一个a标签

```vue
<template>
  <h2>App content</h2>

  <router-link to="/home">HomePage</router-link>
  <br>
  <router-link to="/about">AboutPage</router-link>
  <router-view></router-view>
</template>
```



- 若使用History模式只需要这样：

```javascript
import { createRouter, createWebHistory } from "vue-router";
```

```javascript
    history: createWebHistory(),
```

这样网页显示的url就没有井号了



# 路由的使用步骤

- 第一步：创建路由需要映射的组件（打算显示的页面）
- 第二部：通过createRouter创建路由对象，并且传入routes和history模式
  - 配置路由映射：组件和路径映射关系的routes数组
  - 创建基于hash或者history的模式
- 第三步：使用app注册路由对象（use方法）
- 第四步：路由使用：通过`<router-link>`和`<router-view>`



# router-link的几个属性

- to属性
  - 是一个字符串，或者是一个对象
- replace属性
  - 设置replace属性的话，当点击时，会调用router.replace()，而不是router.push()
- active-class属性
  - 设置激活a元素后应用的class，默认是router-link-active
- exact-active-class属性
  - 链接精准激活时，应用于渲染的<a>的class，默认是router-link-exact-active





# 路由的懒加载

```javascript
// 路由的懒加载
const Home = () => import(/*webpackChunkName: 'home'*/"../Home.vue")
const About = () => import(/*webpackChunkName: 'about'*/"../About.vue")

```

这样之后再打包就可以分包

/**/是魔法注释，可以设定分包的名字

重构可以这样写：

```javascript
    routes: [
        { path: "/", redirect: "/Home" },
        { path: "/home", component: () => import(/*webpackChunkName: 'home'*/"../Home.vue") },
        { path: "/about", component: () => import(/*webpackChunkName: 'about'*/"../About.vue") }
    ]
```



# 路由的其他属性

- name属性：路由**独一无二的**名称
- meta属性：自定义的数据


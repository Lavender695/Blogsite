# Vue CLI脚手架

- 脚手架时建筑工程中的一个概念，在我们软件工程中也会讲一些帮助我们搭建项目的工具称之为脚手架
- Vue的脚手架就是Vue CLI：
  - CLI时Command-Line Interface，翻译为命令行界面
  - 我们可以通过CLI选择项目的配置和创建出我们的项目
  - Vue CLI已经内置了webpack相关的配置，我们不需要从零来配置



# Vue CLI安装和使用

- 脚手架本身也是一个npm的包
- 命令是`npm install @vue/cli`，windows系统在cmd中
- `npm install @vue/cli -g`即全局安装，这样在任何时候都可以通过vue的命令来创建项目

- 可通过`npm update @vue/cli -g`更新版本
- 通过`vue --version`查看当前版本或确认有无安装过脚手架



## 脚手架的创建

在vscode终端bash中创建

- `vue create your_project_name`

使用`cd`（创建完之后会有提示）进入项目目录之后，再输入`npm run serve`可以运行项目，第一次打包会有点慢



## 认识脚手架结构

- node_nodules——所有的依赖都在这里面
- public——html模板和图标
- src——以后我们编写源代码的地方
- browserslistrc——进行浏览器适配
- .gitignore——git哪些文件要忽略掉
- babel.config.js——一些配置文件
- jsconfig.json——给vscode看的文件，给我们更好的提示
- package-lock.json——依赖锁文件
  - 锁定所有依赖包的确切版本号（包括间接依赖的子依赖）
  - 确保不同电脑或环境下安装的依赖版本完全一致
- pacakage.json——项目清单文件
  - 记录项目的基本信息
  - 定义项目依赖的第三方库
  - 储存可执行的脚本文件
- readme.md
- vue.config.js——可以自定义配置





# App.vue

包含以下三部分：

- <template></template> (可以理解为从script里面拿出来的，有点像html)

- <script></script>

- <style></style>



- main.js中`import App from './App.vue'`，同时App.vue中也要在`<script>`里面的对象前面`export default`

一个App.vue文件的样例（计数器）：

```vue
<template>
  <h2>当前计数：{{ counter }}</h2>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
export default {
    data() {
      return {
        counter: 0
      }
    },

    methods: {
      increment() {
        this.counter++
      },
      decrement() {
        this.counter--
      }
    }
  }
</script>

<style>
button {
  margin-right: 20px;
}
</style>

```



- 当引入其他.vue文件组件时，需要注意在main.js文件内进行注册
  - 先import
  - 在app.component("组件名字", 组件)（全局注册）
- 或者局部注册：
  - 在它的上一级.vue组件中的script引入它
  - 然后在option api中添加components，注册它





## jsconfig.json文件的作用

- 可以在paths里面配置路径的提示
- 总之就是一个可以自定义提示的地方，给vscode看的，写代码更友好



# style自己的作用域

- 当在.vue文件里直接设置style的时候，它的作用域其实是全局的
- 要想避免对全局生效，需要加上**scoped**

```javascript
<style scoped></style>
```

这样便只会在当前文件生效，一般来说.vue文件的style都会这样加上

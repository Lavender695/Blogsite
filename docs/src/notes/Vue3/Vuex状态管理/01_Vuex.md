# Vuex的安装

```bash
npm install vuex
```



# Vuex的状态管理

![](C:\Users\lavender\OneDrive\桌面\Vue3笔记\img\Vuex.png)

例子：

> store/index.js

```javascript
import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            counter: 100
        }
    },
    mutations: {
        increment(state) {
            state.counter++
        }
    }
})

export default store

```

> main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')

```

> App.vue

```vue
<template>
  <div class="app">
    <h2>App当前计数：{{ $store.state.counter }}</h2>
  </div>

  <home/>
  <button @click="btnClick">+1</button>
</template>

<script setup>
  import Home from './components/Home.vue';
  import { useStore } from 'vuex';

  components: {
    Home
  }

  const store = useStore()

  function btnClick() {
    store.commit("increment")
  }
  
</script>
```



# 创建store

每一个Vuex应用的核心就是store（仓库）：

- store本质上是一个容器，它包含着你的应用中大部分的状态（state）

Vuex和单纯的全局对象有什么区别呢？

- 第一：Vuex的状态存储时响应式的
  - 当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会被更新
- 第二：你不能直接改变store中的状态
  - 改变store中的状态的唯一途径就是**提交（commit）mutation**
  - 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态
- 使用步骤：
  - 创建Store对象
  - 在app中通过插件安装



# 单一状态树

- 用一个对象就包含了全部的应用层级的状态
- 这个意味着，每个应用将仅仅包含一个store实例



# getters

- 某些属性我们可能需要经过变化后来使用，这个时候可以使用getters

```javascript
getters: {
	// 1.基本使用
	doubleCounter(state) {
		return state.counter * 2
	},
	
	// 2. 在该getters属性中，获取其他的getters
	meesage(state, getters) {
		return `name: ${state.name} level: ${state.level}`
	}
	
	// 3.getters是可以返回一个函数的，调用这个函数可以传入参数
	getFriendById(state) {
		return function(id) {
			const friend = state.friends.find(item => item.id === id)
			return friend
		}
	}
}
```


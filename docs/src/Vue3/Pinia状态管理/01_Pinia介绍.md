# Pinia

- Pinia本质上已然是一个状态管理的库，用于跨组件、页面进行状态共享

- 与vuex相比，pinia提供了一个更简单的api，具有更少的仪式，提供了composition api风格的api
- 更重要的是，在与typescript一起使用时具有可靠的类型推断支持



# Pinia的安装

```bash
npm install pinia
```

或

```bash
yarn add pinia
```



# pinia的创建

> pinia/index.js

```javascript
import { createPinia } from "pinia";

const pinia = createPinia()

export default pinia
```

> main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './pinia'

createApp(App).use(pinia).mount('#app')
```



# pinia的基本使用

> pinia/counter.js

- store是使用defineStore（）定义的
- 它需要一个唯一名称，作为第一个参数传递

```javascript
// 定义关于counter的store
import { defineStore } from "pinia";

// defineStore返回的是一个函数
const useCounter = defineStore("counter", {
    state() {
        return {
            count: 99
        }
    }
})

export default useCounter
```

> view/Home.vue

```javascript
<template>
    <h2>Home View</h2>
    <h2>count: {{ counterStore.count }}</h2>
</template>

<script setup>
import useCounter from '@/pinia/counter';

const counterStore = useCounter()
</script>
```





# 认识store

- 一个store（如pinia）是一个实体，它会持有为绑定到你组件树的状态和业务逻辑，也就是保存了全局的状态
- 她有点像始终存在，并且每个人都可以读取和写入的组件
- 你可以在你的应用程序中定义任意数量的store来管理你的状态



# 操作state

- 读取和写入state：

  - 默认情况下，可以通过store实例访问状态来直接读取和写入状态

  ```javascript
  const counterStore = unsCounter()
  
  counterStore.counter++
  counterStore.name = "coderwhy"
  ```

- 重置state

  - 可以通过调用store上的`$reset()`方法将状态重置到其初始状态

  ```javascript
  const counterStore = useCounter()
  counterStore.$reset()
  ```

- 改变state

  - 除了直接用store.counter++修改store，还可以调用`$patch`方法
  - 它允许您使用部分"state"对象同时应用多个更改

  ```javascript
  const counterStore = useCounter()
  
  counterStore.$patch({
  	counter: 100,
  	name: "kobe"
  })
  ```

- 替换state

  - 可以通过将其$state属性设置为新对象来替换store的整个状态
  - 是同一个对象，没有完全替代

  ```javascript
  counterStore.$state = {
  	counter: 1,
  	name: 'why'
  }
  ```

  

# 认识Getters

- getters相当于store的计算属性：
  - 它们可以用defineStore()中的getters属性定义
  - getters中可以定义接受一个state作为参数的函数

- getter普通用法

```javascript
doubleCount(state) {
	return state.count * 2
}
```

- 一个getter引入另一个getter

```javascript
doubleCountAddOne() {
	// this是store实例
	return this.doubleCount + 1
}
```

- getters也支持返回一个函数

```javascript
getFriendById(state) {
	return function(id) {
		for (let i = 0; i < state.friends.length; i++) {
			const friend = state.friends[i]
			if (friend.id === id) {
				return friend
			}
		}
	}
}
```



# 认识Actions

- Actions相当于组件中的methods
  - 可以使用defineStore()中的actions属性定义，并且他们非常适合定义业务逻辑

```javascript
actions: {
	increment() {
		this.counter++
	},
	randomCounter() {
		this.counter = Math.random()
	}
}
```

```javascript
function increment() {
	counterStore.increment()
}

function randomClick() {
	counterStore.randomCounter()
}
```

- 和getters一样，在actions中可以通过this访问整个store实例的所有操作



## Actions执行异步操作

Actions中是支持异步操作的，并且我们可以编写异步函数，在函数中使用await

```javascript
actions: {
	increment() {...},
	randomCounter() {...},
	async fetchHomeDataAction() {
		const res = await fetch("网址")
		const data = await res.json()
		return data
	}
}
```


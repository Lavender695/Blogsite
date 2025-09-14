# 认识Composition API

- 为了开始使用Composition API，我们需要有一个可以实际使用它（编写代码）的地方
- 在Vue组件中，这个位置就是setup函数
- setup其实就是组件的另一个选项：
  - 只不过这个选项强大到我们可以用它来替代之前所编写的大部分其他选项
  - 比如methods、computed、watch、data、生命周期等等



# setup函数的参数

它主要有两个参数：

- 第一个参数：props
- 第二个参数：context



## props

- **父组件传递过来的属性会被放到props对象中**，我们在setup中如果需要使用，那么就可以直接通过props参数获取



## context

- 也称之为是一个SetupContext，它里面包含三个属性：
  - attrs：所有的非prop的attribute
  - slots：父组件传递过来的插槽（这个在以渲染函数返回时会有作用）
  - **emit：当我们组件内部需要发出事件时会用到emit**（因为我们不能访问this，所以不可以通过this.$emit发出事件）



# setup函数

例子：

- 只有return了的数据或函数才能关联

- 默认定义的数据都不是响应式数据，需要引入ref
- counter是一个ref对象所以要counter.value

- template里面ref对象自动解包

```vue
<template>
    <!--template里面ref对象自动解包-->
    <h2>当前计数： {{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
</template>

<script>
    import { ref } from 'vue'

    export default {
        setup() {
            // 默认定义的数据都不是响应式数据
            let counter = ref(100)
            const increment = () => {
                // counter是一个ref对象所以要.value
                counter.value++
            }
            const decrement = () => {
                counter.value--
            }
            return {
                counter,
                increment,
                decrement
            }
        }
    }
</script>
```



# 响应式数据



## Reactive函数：定义复杂类型数据

- 只有复杂类型数据可以，一个简单的普通的数据是不能用Reactive的
- 它要求我们必须传入的是一个对象或者数组类型：
  - 如果我们传入一个基本类型数据（String、Number、Boolean）会报警告

```vue
<template>
    <h2>用户名：{{ account.username }}</h2>
    <h2>密码：{{ account.password }}</h2>
</template>

<script>
    import { reactive } from 'vue'

    export default {
        setup() {
            let account = reactive({
                username: "IrieKotoko",
                password: "123456"
            })
            return {
                account
            }
        }
    }
</script>
```



## ref函数：定义简单类型数据（也可以复杂）

- ref会返回一个可变的响应式对象，该对象作为一个响应式的引用维护着它内部的值
- 默认情况下在template中使用ref时，vue会自动对其进行解包（取出其中value）
- 但是在setup当中依然需要使用ref.value的方式



- 一般ref可以用于定义本地的一些简单数据、从网络中获取的数据



# 单向数据流（规范）

- 子组件拿到数据之后只能使用，不能修改
- 如果确实要修改，那么应该将事件传递出去



# toRef和toRefs函数

```javascript
let { name, age } = toRefs(person)
```

```javascript
let name = toRef(person.name)
```



# ref其他api

- unref函数
  - 如果参数是一个ref，则返回内部值，否则返回参数本身
  - 这是`val = isRef(val) ? val.value : val`的语法糖函数
- isRef
  - 判断值是否是一个ref对象
- shallowRef
  - 创建一个浅层的ref对象

- triggerRef
  - 手动触发和shallowRef相关联的副作用



# setup不可以使用this

- 因为源码当中就没有绑定this



# setup中的computed

```javascript
let fullname = computed(() => {
	return names.firstName + ' ' + names.lastName
})
```

- computed返回的是一个ref对象



# setup中使用ref

- 只需要定义一个ref对象，绑定到元素或者组件的ref属性上即可

```javascript
<h2 ref="titleRef">Hello world</h2>
```

```javascript
setup() {
	const titleRef = ref()
	
	return {
	titleRef
	}
}
```





# 生命周期钩子

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted
- onActivated
- onDeactivated



# Provide和Inject

## provide

- 我们可以通过provide来提供数据
- 可以传入两个参数：
  - name——提供的属性名称
  - value——提供的属性值

## inject

- 在**后代组件**中可以通过inject来注入需要的属性和对应的值
- inject可以传入两个参数：
  - 要inject的property的name
  - 默认值

> 父组件

```vue
<template>
    <compo></compo>
</template>

<script>
    import { provide } from 'vue'
    import Compo from './Compo.vue'

    export default {
        components: {
            Compo
        },
        setup() {
            let counter = 100
            let info = {
                name: "Irie",
                age: 19
            }

            provide("counter", counter)
            provide("info", info)

            return {
                counter, info
            }
        }
    }
</script>
```

> 子组件

```vue
<template>
    <h2>counter: {{ counter }}</h2>
    <h2>name: {{ info.name }} - age: {{ info.age }}</h2>
</template>

<script>
import { inject } from 'vue';


    export default {
        setup() {
            let counter = inject("counter")
            let info = inject("info")

            return { counter, info }
        }
    }
</script>
```



# watch函数侦听

```vue
import { watch } from 'vue'
```

```vue
watch(message, (newValue, oldValue) => {
	console.log(newValue, oldValue)
})
```



## watchEffect函数

- watchEffect传入的函数默认会直接被执行
- 在执行的过程中，会自动收集依赖（依赖哪些响应式的数据）

### watchEffect的停止监听

- 把它赋给一个值，然后通过条件判断**调用它**

```
const stopWatch = watchEffect(() => {
	if (counter.value >= 10) {
	stopWatch()
	}
})
```





# script setup语法糖

```vue
<script setup>
</script>
```

- 不需要components:{}了，引入之后就可以直接使用
- 不需要return {}了，可以直接关联
- 所有编写在顶层中的代码

- 都是默认暴露给template可以使用
- 函数中定义的，低一层作用域的就不叫顶层了
- 响应式数据需要通过ref、reactive来创建



## defineProps

```javascript
const props = defineProps({
	name: {
		type: String,
		default: "默认值"
	}
})
```



## defineEmits

```javascript
const emits = defineEmits(["btnClick"])
function showBtnClick() {
	emits("btnClick", "发生了点击")
}
```



## defineExpose

- 将子组件中的变量函数等暴露给父组件

```javascript
// 定义foo的函数
function foo() {
	console.log("foo function")
}

defineExpose({
	foo
})
```


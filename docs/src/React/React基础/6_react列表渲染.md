# react列表渲染

- 真是开发中我们会从服务器请求到大量的数据，数据会以列表的形式存储
- 在react中并没有像vue模块语法中的v-for指令，而且需要我们通过js代码的方式组织数据，转成jsx
  - 很多从vue转型到react的同学很不习惯，认为vue的方式更加简洁明了
  - 但是react中的jsx正是因为和js无缝的衔接，让他可以更加地灵活
  - react是真正可以提高我们编写代码能力的一种方式

- 如何展示列表呢？
  - 在react当中，展示列表最多的方式就是使用数组的map高阶函数

- 很多时候我们在展示一个数组中的数据之前，需要先对它进行一些处理：
  - 比如过滤掉一些内容：filter函数 
  - 比如截取数组中的一部分内容：slice函数

```js
const filterStudents = students.filter(item => {
    return item.score > 100
})
```

```js
const sliceStudents = filterStudents.slice(0, 2)
```



## 列表中的key

- 只要展示列表都会报一个警告
- 这个警告是告诉我们需要在列表展示的jsx中添加一个key
  - key主要的作用是为了提高diff算法时的效率

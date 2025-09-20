# v-for

- (item, index)

```javascript
    <div id="app">
        <h2>影视列表</h2>
        <ul>
            <li v-for="(item, index) in movies">{{ index + 1 }} - {{ item }}</li>
        </ul>
    </div>
```


- 遍历数组复杂数据
```javascript
        <h2>商品列表</h2>
        <div class="item" v-for="item in products">
            <h3 class="title">商品：{{ item.name }}</h3>
            <span>价格：{{ item.name }}</span>
            <p>秒杀：{{ item.desc }}</p>
        </div>
```

- 遍历对象
  - (value, key, index)

```javascript
<li v-for="(value, key, index) in info">{{value}}-{{key}}-{{index}}</li>
```

- 只要是可迭代对象都可以用v-for

```javascript
<li v-for="item in 'message'">{{item}}</li>

<li v-for="i in 15">{{i}}</li>
```



## v-for的key属性

- 开发中一般要求key是唯一的，一般是id
- 使用v-bind:key语法，语法糖写为:key

```javascript
<li v-for="item in letters" :key="id">{{ item }}</li>
```
- 绑定key之后可以在虚拟DOM中提升效率



### 虚拟DOM

如果我们又一大堆元素，那么他们会形成一个VNode(Virtual Node) Tree，形成虚拟DOM(Virtual DOM)，再转化为真实DOM，再将真实DOM渲染到界面上

虚拟DOM的作用：

- 跨平台
- 支持diff算法
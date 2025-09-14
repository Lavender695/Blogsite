在某些情况下，我们需要根据当前的条件决定某些元素或徐建是否渲染

## Vue提供了下面的指令来进行条件判断

- v-if
- v-else
- v-else-if
- v-show

应用场景：

```javascript
        <ul v-if="names.length > 0">
            <li v-for="item in names">{{ item }}</li>
        </ul>

        <h2 v-else>Now there is no name</h2>
```



### v-if

v-if如何判断一个对象是否为空？（空的对象在转换为布尔值时依旧为true）

方法如下：

```javascript
<div class="info" v-if="Object.keys(info).length"></div>
```



### v-show和v-if的区别

- v-show不支持template
- v-show不可以和v-else一起使用
- v-show的DOM实际存在，v-if为false时不会被渲染到DOM中
- 如果元素需要在显示与隐藏之间频繁切换，那么使用v-show
- 如果不会频繁发生切换，那么使用v-if



## template元素

- template元素可以当作不可见的包裹元素，并且在v-if上使用，但是最终template不会被渲染出来，而div会让浏览器多渲染一个元素
  - 有点类似与小程序中的block
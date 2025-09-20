# JSX本质和原理

## JSX转换过程

- 实际上，jsx仅仅只是React.createElement(component, props, ...children) 函数的语法糖
  - 所有的jsx最终都会被转换成React.createElement的函数调用



- createElement需要传递三个参数：

  - 参数一：type

  - 参数二：config
  - 参数三：children



- jsx是通过babel帮我们进行语法转换的
- 可以在babel的官网中快速查看转换的过程



## 虚拟DOM的创建过程

- 我们通过React.createElement最终创建出来一个ReactElement对象
- 这个ReactElement对象是什么作用呢？React为什么要创建它呢？
  - 原因是React利用ReactElement对象组成了一个js的对象树
  - js的对象树就是虚拟DOM（Virtual DOM）

- 虚拟DOM再经过渲染就成为了真实DOM

 

## 虚拟DOM另外的作用

- 虚拟DOM可以渲染成web端的元素，但是也可以渲染为iOS或Android的控件（跨平台）
- 但是现在一般用flutter什么的，它比较厉害

- 用react开发原生叫做ReactNative
- 用vue开发原生叫做Weex
- 前端一般是不需要去做原生开发的


- 虚拟DOM帮助我们从命令式编程赚到了声明式编程的模式
- React官方的说法： Virtual DOM是一种编程理念
  - 在这个理念中，UI以一种理想化或者说虚拟化的方式保存在内存中，并且它是一个相对简单的js对象
    - 相对简单是相对的真实DOM来说的
  - 我们可以通过ReactDOM.render让虚拟DOM和真实DOM同步起来，这个过程叫做协调 (Reconciliation)

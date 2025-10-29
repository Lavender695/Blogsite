# 关于setState

- 为什么react中要用setState但是vue中不用呢？因为vue中自动做了一个数据劫持，当你的数据变化的时候，它会自动重新渲染页面，而react中则没有数据劫持，直接更改this.state中的数据的时候，不会重新渲染页面，但是如果调用setState，则相当于它会自动调用render函数
- 我们必须通过setState来告知react数据已经发生了改变

- setState是来自于该组件定义时继承的Component当中



## setState的三种写法

### 1.直接设置新值

```jsx
// 适用于不需要基于前一个状态的简单状态更新
this.setState({ count: 10 });
this.setState({ name: 'John' });
```

### 2.使用函数式更新

```jsx
// 适用于需要基于前一个状态的值进行计算
this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});

// 简化写法
this.setState(prevState => ({
  count: prevState.count + 1
}));
```

### 3.设置状态后执行回调函数

第一个参数设置状态，第二个参数是回调函数

```jsx
// 适用于需要在状态更新完成后执行某些操作
this.setState(
  { count: 10 },
  () => {
    console.log('状态已更新:', this.state.count);
    // 这里可以执行依赖于新状态的操作
  }
);

// 结合函数式更新
this.setState(
  prevState => ({ count: prevState.count + 1 }),
  () => {
    console.log('新的count值:', this.state.count);
  }
);
```



## setState异步更新

- setState是异步的操作，我们并不能在执行完setState之后厘米那拿到最新的state的结果



### 为什么setState设计为异步呢？

- 可利用显著的提升性能
  - 如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，页面重新渲染，这样效率是很低的
  - 最好的办法应该是获取到多个更新，之后进行批量更新
- 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步
  - state和props不能保持一致性，会在开发中产生很多的问题



### setState一定是异步的吗？

答：不一定，react18之前有一些特殊情况下是同步的

例如setTimeout中setState操作，是同步操作 

在react18之后，默认所有的操作都被放到了批处理中（异步处理）
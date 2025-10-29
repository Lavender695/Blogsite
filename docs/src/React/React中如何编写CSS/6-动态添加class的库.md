# 动态添加class的库

- react在jsx给了足够多的灵活性，可以像编写js代码一样，通过一些逻辑来决定是否添加某些class

```jsx
<div>
	<h2 className={"title" + (isActive ? "active": "")}>title</h2>
</div>
```

- 这个时候我们可以借助于一个第三方的库：**classnames**

- 这是一个用于动态添加classnames的一个库

```jsx
classNames("foo", { bar: isBar }) // 当isBar为真 => 'foo bar'
```


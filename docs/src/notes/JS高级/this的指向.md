# this到底指向什么

1. 函数在调用时，js会默认给this绑定一个值
2. this的绑定和定义的位置（编写的位置）没有关系
3. this的绑定和调用方式以及调用的位置有关系
4. this是在运行时被绑定的

```js

        function foo() {
            console.log(this)
        }

        // 1.调用方式一：直接调用
        foo() // window

        // 2.调用方式二：将foo放到一个对象中，再调用
        let obj = {
            name: "lwt",
            foo: foo
        }
        obj.foo() // obj对象

        // 3.调用方式三：通过call/apply调用
        foo.call("abc")  // String {"abc"} 对象
```

# this的绑定规则

- 绑定一：默认绑定
- 绑定二：隐式绑定
- 绑定三：显示绑定
- 绑定四：new绑定



## this绑定规则一-默认绑定

- 在独立函数调用的情况下使用默认绑定
- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用

```js
        "use strict"

        // 1. 普通的函数被独立的调用
        function foo() {
            console.log("foo:", this)
        }
        foo()

        // 2. 函数定义在对象中，但是独立调用
        let obj = {
            name: "lwt",
            bar: function() {
                console.log("bar:", this)
            }
        }

        let baz = obj.bar
        baz()

        // 3. 高阶函数
        function test(fn) {
            fn()
        }

        test(obj.bar)

        // 4. 严格模式下，独立调用的函数中的this指向的是undefined
```

## this绑定规则二-隐式绑定

- 通过某个对象进行调用的
- 也就是它的调起位置中，是通过某个对象发起的函数调用
- **隐式绑定的规则是：当函数被一个对象“拥有”并调用时，函数内部的 `this` 会自动绑定到调用它的那个对象上。**

```js
// 常见的隐式绑定
        function foo() {
            console.log(this)
        }

        let obj = {
            name: "lwt",
            foo: foo
        }

        obj.foo() // this指向obj
```

```js
        function foo() {
            console.log(this)
        }

        let obj1 = {
            name: "obj1",
            foo: foo
        }

        let obj2  = {
            name: "obj2",
            obj1: obj1
        }

        obj2.obj1.foo() // this指向obj1
```

```js
        function foo() {
            console.log(this)
        }
        let obj1 = {
            name: "obj1",
            foo: foo
        }

        //将obj1的foo赋值给bar
        let bar = obj1.foo
        bar() // this指向window
```

## this绑定规则三-new绑定

- **当使用 `new` 关键字调用一个函数（构造函数）时，会创建一个全新的对象，并且这个新对象会绑定到该函数调用中的 `this` 上。**

当你写 `new MyFunction()` 时，JavaScript 引擎会自动完成以下四个步骤：

1. **创建（Create）**：创建一个全新的空对象 `{}`。
2. **链接（Link）**：将这个新对象的 `[[Prototype]]`（内部链接）连接到 `MyFunction.prototype` 上。（这就是原型继承的核心）
3. **绑定（Bind）**：将步骤1创建的新对象**绑定**到 `MyFunction` 函数调用中的 `this` 上。
4. **返回（Return）**：如果 `MyFunction` 函数没有显式返回另一个对象，则自动返回这个新创建的对象。

**其中，第3步就是 `new` 绑定的核心：它将新创建的对象赋值给函数内部的 `this`。**

```js
        function foo() {
            console.log("foo函数:", this)
        }

        new foo() // this指向foo函数
```

## this绑定规则四-显式绑定

### apply和call

```js
        let obj = {
            name: "lwt"
        }

        function foo() {
            console.log("foo函数:", this)
        }

        // 执行函数，并且函数中的this指向obj对象
        obj.foo = foo
        obj.foo()

        // 执行函数，并且强制this就是obj对象
        foo.call(obj)
        foo.call(123)
        foo.call("lwt")
        obj.foo.call(6666)
        foo.call(undefined) // 默认绑定到window上面
```

- JS所有的函数都可以使用call和apply方法
- 第一个参数是相同的，要求传入一个对象
  - 这个对象就是给this准备的
  - 在调用这个函数时，会将this绑定到这个传入的对象上
- 后面的参数，**apply为数组，call为参数列表**

```js
// call/apply
        function foo(name, age, height) {
            console.log("foo函数被调用:", this)
        }

        // ()调用
        foo("lwt", 19, 163)

        // apply
        // 第一个参数：绑定this
        // 第二个参数：传入额外的实参，以数组的形式
        foo.apply("apply", ["kobe", 30, 198])

        // call
        // 第一个参数：绑定this
        // 参数列表：后续的参数以多参数的形式传递，会作为实参
        foo.call("call", "james", 25, 2.05)
```

### bind

- 如果我们希望一个函数**总是显式绑定**到一个对象身上，那么我们可以使用bind
- 使用bind方法，bind()方法创建一个新的绑定函数



# this绑定的优先级

1. 默认绑定的优先级最低
2. 显式绑定的优先级高于隐式绑定
3. new绑定优先级高于隐式绑定
4. new绑定优先级高于bind
   - new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高
   - new绑定可以和bind一起使用，new绑定优先级更高

5. bind的优先级高于apply/call



# this规则之外

## 忽略显式绑定

  如果在显式绑定中，我们传入一个null或者undefined，那么这个显式绑定会被忽略，使用默认规则



## 间接函数使用

  创建一个函数的间接使用，这种情况使用默认绑定规则

- 赋值(obj2.foo = obj1.foo)的结果是foo函数
- foo函数被直接调用，那么是默认绑定

# this的指向

## this到底指向什么

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


# this有关的面试题

## 第一题

```js
        let name = "window"
        let person = {
            name: "Person",
            sayName: function () {
                console.log(this.name)  // 
            }
        }
        function sayName() {
            let sss = person.sayName

            sss()  // 绑定：默认绑定，window

            person.sayName() // 绑定：隐式绑定，person

            (person.sayName)() // 绑定：隐式绑定，person

            (b = person.sayName)() // 术语：间接函数引用，window
        }
        sayName()
```

## 第二题

```js
let name = 'window'

function Person(name) {
    this.name = name
    this.foo1 = function () {
        return function () {
            console.log(this.name)
        }
    },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function () {
        return function () {
            return () => {
                console.log(this.name)
            }
        }
    }
    this.foo4 = function () {
        return () => {
            console.log(this.name)
        }
    }
}

let person1 = new Person('person1')
let person2 = new Person('person2')

person1.foo1() // 隐式绑定：person1
person1.foo1.call(person2) // 显式绑定：person2

person1.foo2() // 上层作用域查找：person1（new绑定）
person1.foo2.call(person2) // 上层作用域查找：person1（箭头函数没有this，call没有意义）

person1.foo3()() // 默认绑定：window（独立函数调用）
person1.foo3.call(person2)() // 默认绑定：window（独立函数调用，person2绑的上层）
personalbar.foo3().call(person2) // 显式绑定：person2


 personalbar1.foo4()() // 上层作用域查找：person1（隐式绑定）
 personalbar.foo4.call(person2)() // 上层作用域查找：person2（显式绑定）
 person1.foo4().call(person2) // 上层作用域查找：person1（隐式绑定）

```




# React脚手架

## 认识脚手架工具(Scaffold)

现代的前端项目已经越来越复杂了：

- 比如 css可能是使用less、sass等需要预处理器进行编写，我们需要将它们转成普通的css才能被浏览器解析
- 比如js代码不再只是编写在几个文件中，而是通过模块化的方式，被组成在成百上千个文件中，我们需要通过模块化的技术来管理它们之间的互相依赖
- 比如项目需要依赖很多的第三方库，如何更好的管理它们（比如管理它们的依赖、版本升级等）



为了解决上面这些问题，我们需要再去学习一些工具：

- 比如babel、webpack、gulp，配置他们转换规则、打包依赖、热更新等等的一些内容
- 脚手架的出现，就是帮助我们解决这一系列问题的



**总结：脚手架让项目从搭建到开发，再到部署，整个流程变得快速和便捷**

## 前端脚手架

对于现在比较流行的三大框架都有属于自己的脚手架：

- Vue的脚手架： @vue/cli
- Angular的脚手架：@angular/cli
- React的脚手架：create-react-app (CRA)

它们的作用都是帮助我们生成一个通用的目录结构，并且已经将我们所需的工程环境配置好

使用这些脚手架需要依赖什么？

- 目前**这些脚手架都是使用node编写的，并且都是基于webpack的**
- 所以我们必须再自己的电脑上安装node环境

> Node.js是一个基于Chrome V8引擎的JS运行时环境



# 创建React项目

- 创建React项目的命令如下：
  - 注意：项目面擀成不能包含大写字幕

```shell
create-react-app 项目名称
```

- 创建完成之后，进图对应的目录，就可以将项目跑起来：

```shell
cd 你的项目
yarn start
```

> 原来cra默认是使用yarn，但是现在默认又改成使用npm了
>
> 原因是yarn本身就是因为当年npm使用体验不好，所以几个公司开发起来替代npm使用的
>
> 但是后来npm发展更新之后体验效果变好了，并且也是node官方的包管理工具，所以还是默认使用npm了



## 创建的文件结构

### node_modules/

存放依赖



### public/

除了网页入口文件和网页图标外，也会配置PWA相关的一些图标

#### 	index.html

​	网页的入口文件

	#### 	一些图标

#### 	manifest.json

​	配置图标文件，以及PWA相关配制

#### 	robots.txt

​	配置希望哪些文件可以被爬虫，哪些文件不可以被爬虫


### src/

编写源代码，所有的源代码都放在src文件夹里面



### .gitignore

git的忽略文件



### package.json

对整个应用程序的描述：包括应用名称，版本号，一些依赖包，以及项目的启动、打包等

但是在这里有一些记录的版本只是一个大概的版本，比如`"^19.1.1"`



### package-lock.json

记录我们每个安装的真实版本



### README.md

对项目的描述



## 了解PWA

整个目录结构非常好理解，只是有一个PWA相关的概念：

- PWA全称Progressive Web App，即渐进式Web应用
- 一个PWA应用首先是一个网页，可以通过Web技术编写出一个网页应用
- 随后添加上App Manifest和Service Worker来试下你PWA的安装和离线等功能
- 这种Web存在的形式，我们也称之为是Web App
- 这个一般是针对手机端的·，可以把这个网页添加为你的桌面图标
- 但是一般国内很少有公司用这个

它的核心目标是让网页应用（Web App）能够提供**堪比原生应用（Native App）** 的体验。

你可以把它理解为一个**披着“应用”外衣的网站**。它通过一些现代 Web 技术，让网站可以安装在手机上、离线工作、接收推送通知，就像你从应用商店下载的 App 一样。





# 脚手架下从零编写代码

```js
import { createRoot } from 'react-dom/client'
import App from './App'
import Lwtcomponent from './Helloworld'


const root = createRoot(document.querySelector("#root"))
root.render(<Lwtcomponent/>)
```



# 脚手架中的webpack

- react脚手架默认是基于webpack来开发的
- 但是我们并没有在目录结构中看到任何webpack相关的内容
  - 原因是react脚手架将webpack相关的配置隐藏起来了（其实从Vue CLI3开始，也进行了隐藏）
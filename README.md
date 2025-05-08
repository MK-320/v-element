# 🟦V-Element

>This is an implementation of a component library similar to ElementUI-Plus based on Vue3 and TS, which has realized some of its components and can be used directly.<br>
>✨️这是一个基于Vue3和TS开发的仿ElementUI-Plus组件库的实现，实现了其中部分的组件，可以直接使用。
>
>Official Npm Website:[@drgeek/v-element](https://www.npmjs.com/package/@drgeek/v-element)

# 💖Use your favorite package manager📦
(💖使用你喜欢的包管理器​📦)
<br>
We recommend that you install V-Element using a package manager such as NPM, Yarn or pnpm, and then you can use a bundler like Vite or webpack.<br>
我们建议您使用包管理器（如 NPM、[Yarn](https://classic.yarnpkg.com/lang/en/) 或 [pnpm](https://pnpm.io/)）安装 V-Element，然后您就可以使用打包工具，例如 [Vite](https://vitejs.dev/) 或 [webpack](https://webpack.js.org/)。

## Installation 📘安装
### NPM 

```shell
npm install @drgeek/v-element --save

```

### Yarn

```shell
yarn add @drgeek/v-element --save

```
# Quick Start 🔥开始使用
## Usage📖用法
### 🥇Full Import(全局引入)

Global import will import all components and register them as global components, which can be directly used. It needs to be imported in the `main.ts` file. 
However, the size of the package will be quite large. If you don't care much about the size of the packed files, then using the full import option will be more convenient.
<br>
全局引入会导入所有组件，并且注册为全局组件，可以直接使用，需要在 `main.ts` 文件中引入文件。 
但其包的大小会很大，如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
import { createApp } from 'vue'
import VElement from '@drgeek/v-element'
import '@drgeek/v-element/dist/v-element.css'
import App from './App.vue'

const app = createApp(App)

app.use(VElement)
app.mount('#app')
```
After that, it can be directly used in a certain file without the need for re-introduction. 
🌰For example, the Button component can be directly used in `App.vue`.

之后在某个文件中可以直接使用，不需要再次引入，比如在`App.vue`中直接使用Button组件。
```vue
<template>
    //第一种方式
  <vm-button>I am a Button</vm-button>
  //第二种方式
  <vmButton  type="danger">I am a Button2</vmButton>
</template>

<script>

</script>
```


### Volar support(Volar 支持)
If you are using Volar, please specify the global component type in `tsconfig.json` through the compilerOptions.type option.
如果您使用 Volar，请在 `tsconfig.json` 中通过 compilerOptions.type 指定全局组件类型。

```js
{
  "compilerOptions": {
    //...
    "types": ["v-element/global"]
  }
}
```

### 🥈Manually import(按需引入)
V-Element offers an out-of-the-box Tree Shaking feature based on ES Module. 
If you only need to use a certain component from v-element, then you can use the on-demand import method. Just import it in the component where you need to use it.

V-Element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。
如果您只是需要使用v-element其中的某个组件，那么您可以使用按需引入的方式，只需要在需要使用的组件中导入即可。
<br>
🌰For example, in `App.vue`, the Button component is used.
比如在`App.vue` 中使用Button组件
```vue
<template>
  <Button>我是 VMButton</Button>
</template>
<script>
  import { Button } from '@drgeek/v-element'
  export default {
    components: { Button },//注册组件
  }
</script>
```

# ☕️支持本项目
✨️如果您喜欢本项目，请给本项目点一个star，谢谢！
🎉️如果您有好的建议或者想要贡献代码，欢迎提交issue或者pull request！



<img src="赞赏码.jpg" alt="支持作者" style="width:400px;"/>

# License
[MIT](https://github.com/MK-320/v-element/blob/main/LICENSE) License © 2025-PRESENT [Drgeek](https://github.com/MK-320)


# 💖使用你喜欢的包管理器​📦
我们建议您使用包管理器（如 NPM、[Yarn](https://classic.yarnpkg.com/lang/en/) 或 [pnpm](https://pnpm.io/)）安装 V-Element，然后您就可以使用打包工具，例如 [Vite](https://vitejs.dev/) 或 [webpack](https://webpack.js.org/)。

## 📘安装
### NPM 

```shell
npm install @drgeek/v-element --save

```

### Yarn

```shell
yarn add @drgeek/v-element --save

```
# 🔥开始使用
## 📖用法
### 全局引入
全局引入会导入所有组件，并且注册为全局组件，可以直接使用，需要在 `main.ts` 文件中引入文件。 <br>
但其包的大小会很大，如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。。

```ts
import { createApp } from 'vue'
import VElement from '@drgeek/v-element'
import '@drgeek/v-element/dist/v-element.css'
import App from './App.vue'

const app = createApp(App)

app.use(VElement)
app.mount('#app')
```
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


### Volar 支持
如果您使用 Volar，请在 `tsconfig.json` 中通过 compilerOptions.type 指定全局组件类型。

```json
{
  "compilerOptions": {
    // ...
    "types": ["v-element/global"]
  }
}
```

### 按需引入
V-Element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。<br>
如果您只是需要使用v-element其中的某个组件，那么您可以使用按需引入的方式，只需要在需要使用的组件中导入即可。

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



import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import eslintPlugin from '@nabla/vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),

    eslintPlugin(),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }), //默认使用vite库模式的情况，不会生成ts的类型声明文件*.d.ts，需要使用这个插件来解决
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    lib: {
      //库模式 lib:{}
      // Could also be a dictionary or array of multiple entry points
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'V-Element',
      // the proper extensions will be added
      fileName: 'v-element',
    },
    //rollup的配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
      ],
      output: {
        exports: 'named', //关闭构建时的警告，入口文件的默认导出和命名导出都需要使用
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})

/**
 * UMD 库构建：仅将 `vue` 标记为 external（通过 globals 映射到全局 `Vue`）。
 * 其余运行时依赖（@fortawesome/*、@popperjs/core、async-validator、lodash-es 等）
 * 会打进本 UMD 文件；与 ES 构建（vite.es.config.ts）中多项 external 的策略不同，
 * 因此 UMD 体积更大、内联依赖更多。选型与体积预期见 README「构建产物说明」。
 */
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/umd',
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'V-Element',
      fileName: 'v-element',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})

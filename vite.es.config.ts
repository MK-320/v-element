import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//import JavaScriptObfuscator from 'javascript-obfuscator'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
    }), //默认使用vite库模式的情况，不会生成ts的类型声明文件*.d.ts，需要使用这个插件来解决
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/es',
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'V-Element',
      fileName: 'v-element',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        'async-validator',
        '@popperjs/core',
        'axios',
      ],
      // output: {
      //   plugins: [
      //     {
      //       name: 'obfuscator',
      //       renderChunk(code) {
      //         return JavaScriptObfuscator.obfuscate(code, {
      //           compact: true,
      //           controlFlowFlattening: true,
      //           deadCodeInjection: true,
      //           identifierNamesGenerator: 'hexadecimal',
      //           log: false,
      //           renameGlobals: false,
      //           rotateStringArray: true,
      //           selfDefending: true,
      //           sourceMap: false,
      //           stringArray: true,
      //           stringArrayThreshold: 0.75,
      //         }).getObfuscatedCode()
      //       },
      //     },
      //   ],
      // },
    },
  },
})

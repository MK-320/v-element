import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
//增加@为../../src目录设置

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'V-Element',
  description: 'A VitePress Site',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started.md' },
      { text: '组件', link: '/components/button' },
    ],

    sidebar: [
      {
        text: 'V Element 组件列表',
        items: [
          { text: '安装与使用', link: '/get-started.md' },
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Alert 警告', link: '/components/alert' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Message 消息', link: '/components/message' },
          { text: 'Notification 提示', link: '/components/notification' },
          { text: 'Input 文字输入', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Table 表格', link: '/components/table' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/MK-320/v-element' }],
  },
  outDir: '../public',
  base: '/v-element/',
})

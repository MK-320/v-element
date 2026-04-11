import type { App } from 'vue'
import Icon from '@/components/Icon/icon.vue'

Icon.install = (app: App) => {
  app.component(Icon.name || 'VmIcon', Icon)
}

export default Icon

export * from './types'

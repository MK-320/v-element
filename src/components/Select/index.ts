import type { App } from 'vue'
import Select from '@/components/Select/Select.vue'

Select.install = (app: App) => {
  app.component(Select.name || 'VmSelect', Select)
}

export default Select

export * from './types'

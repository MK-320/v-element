import type { App } from 'vue'
import Table from './Table.vue'
import './style.css'

Table.install = (app: App) => {
  app.component(Table.name || 'v-table', Table)
}

export default Table
